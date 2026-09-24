import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { engine } from "@/audio/engine";
import { SONGS, songById, type Song } from "@/data/songs";

const LISTENED_KEY = "cw-listened-v1";
const FAVORITES_KEY = "cw-favorites-v1";
const LISTEN_THRESHOLD = 15; // seconds of playback before a song lights up the village

interface PlayerState {
  current: Song | null;
  playing: boolean;
  elapsed: number;
  loopDur: number;
  listened: Set<string>;
  favorites: Set<string>;
  finaleSeen: boolean;
  play: (song: Song) => void;
  toggle: (song?: Song) => void;
  next: () => void;
  prev: () => void;
  toggleFavorite: (id: string) => void;
  markFinaleSeen: () => void;
  resetJourney: () => void;
}

const Ctx = createContext<PlayerState | null>(null);

function loadSet(key: string): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) ?? "[]") as string[]);
  } catch {
    return new Set();
  }
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Song | null>(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [loopDur, setLoopDur] = useState(1);
  const [listened, setListened] = useState<Set<string>>(() => loadSet(LISTENED_KEY));
  const [favorites, setFavorites] = useState<Set<string>>(() => loadSet(FAVORITES_KEY));
  const [finaleSeen, setFinaleSeen] = useState(false);
  const listenedRef = useRef(listened);
  listenedRef.current = listened;

  useEffect(() => {
    engine.setOnTick((e, d) => {
      setElapsed(e);
      setLoopDur(d);
      const s = engine.currentSong;
      if (s && e >= LISTEN_THRESHOLD && !listenedRef.current.has(s.id)) {
        setListened((prev) => {
          const next = new Set(prev);
          next.add(s.id);
          localStorage.setItem(LISTENED_KEY, JSON.stringify([...next]));
          return next;
        });
      }
    });
    // when a recording ends, drift into the next song like a snow-globe radio
    engine.setOnEnded(() => {
      const cur = engine.currentSong;
      const i = cur ? SONGS.findIndex((s) => s.id === cur.id) : -1;
      const song = SONGS[(i + 1) % SONGS.length];
      engine.play(song);
      setCurrent(song);
      setPlaying(true);
      setElapsed(0);
    });
    return () => {
      engine.setOnTick(null);
      engine.setOnEnded(null);
    };
  }, []);

  const value = useMemo<PlayerState>(() => ({
    current,
    playing,
    elapsed,
    loopDur,
    listened,
    favorites,
    finaleSeen,
    play: (song) => {
      engine.play(song);
      setCurrent(song);
      setPlaying(true);
      setElapsed(0);
    },
    toggle: (song) => {
      if (song && engine.currentSong?.id !== song.id) {
        engine.play(song);
        setCurrent(song);
        setPlaying(true);
        setElapsed(0);
        return;
      }
      if (engine.playing) {
        engine.pause();
        setPlaying(false);
      } else if (engine.currentSong) {
        engine.resume();
        setPlaying(true);
      }
    },
    next: () => {
      const cur = engine.currentSong;
      const i = cur ? SONGS.findIndex((s) => s.id === cur.id) : -1;
      const song = SONGS[(i + 1) % SONGS.length];
      engine.play(song);
      setCurrent(song);
      setPlaying(true);
      setElapsed(0);
    },
    prev: () => {
      const cur = engine.currentSong;
      const i = cur ? SONGS.findIndex((s) => s.id === cur.id) : 0;
      const song = SONGS[(i - 1 + SONGS.length) % SONGS.length];
      engine.play(song);
      setCurrent(song);
      setPlaying(true);
      setElapsed(0);
    },
    toggleFavorite: (id) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
        return next;
      });
    },
    markFinaleSeen: () => setFinaleSeen(true),
    resetJourney: () => {
      setListened(new Set());
      localStorage.removeItem(LISTENED_KEY);
      setFinaleSeen(false);
    },
  }), [current, playing, elapsed, loopDur, listened, favorites, finaleSeen]);

  // expose currently playing song object even across routes
  useEffect(() => {
    if (!current && engine.currentSong) setCurrent(engine.currentSong);
  }, [current]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlayer() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePlayer outside provider");
  return v;
}

export { songById };
