import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SceneArt from "@/components/SceneArt";
import Snowfall from "@/components/Snowfall";
import { REACTIONS, SONGS, songById, type ReactionKey } from "@/data/songs";
import { usePlayer } from "@/store/player";
import { trpc } from "@/providers/trpc";

export default function Song() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const song = songById(id ?? "") ?? SONGS[0];
  const { current, playing, toggle, favorites, toggleFavorite, listened } = usePlayer();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [noteSent, setNoteSent] = useState(false);
  const [shared, setShared] = useState(false);
  const [myReactions, setMyReactions] = useState<Set<ReactionKey>>(new Set());

  const utils = trpc.useUtils();
  const notesQuery = trpc.wonderland.listNotes.useQuery({ songId: song.id });
  const countsQuery = trpc.wonderland.reactionCounts.useQuery({ songId: song.id });
  const addNote = trpc.wonderland.addNote.useMutation({
    onSuccess: () => {
      setNoteSent(true);
      setMessage("");
      utils.wonderland.listNotes.invalidate({ songId: song.id });
    },
  });
  const react = trpc.wonderland.react.useMutation({
    onSuccess: () => utils.wonderland.reactionCounts.invalidate({ songId: song.id }),
  });

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    countsQuery.data?.forEach((r) => m.set(r.reaction, Number(r.count)));
    return m;
  }, [countsQuery.data]);

  const isCurrent = current?.id === song.id;
  const isPlaying = isCurrent && playing;
  const idx = SONGS.findIndex((s) => s.id === song.id);

  const share = async () => {
    const text = `"${song.title}" — from Christmas Wonderland`;
    try {
      if (navigator.share) await navigator.share({ title: song.title, text, url: window.location.href });
      else {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch { /* dismissed */ }
  };

  return (
    <div className="relative min-h-screen bg-night">
      <div className="scene-crossfade" key={song.id}>
        <SceneArt song={song} dim={0.35} />
      </div>
      <Snowfall density={0.6} />

      {/* back + swipe between songs */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Back"
        className="fixed left-4 top-20 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-gold-dim bg-black/30 backdrop-blur-sm hover:border-gold"
      >
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 1 L3 7 L9 13" stroke="#fef1e8" strokeWidth="1.6" fill="none" /></svg>
      </button>

      <div
        className="relative z-10 mx-auto max-w-xl px-6 pb-44 pt-36"
        onTouchStart={(e) => ((window as unknown as { _tx: number })._tx = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - ((window as unknown as { _tx: number })._tx || 0);
          if (Math.abs(dx) > 70) {
            const next = SONGS[(idx + (dx < 0 ? 1 : SONGS.length - 1)) % SONGS.length];
            navigate(`/song/${next.id}`, { replace: true });
          }
        }}
      >
        <p className="fade-up text-[11px] tracking-[0.35em] text-gold uppercase">
          {song.location} · Track {song.track}
        </p>
        <h1 className="fade-up mt-2 font-display text-4xl leading-tight text-cream md:text-5xl" style={{ animationDelay: "0.1s" }}>
          {song.title}
        </h1>
        <p className="fade-up mt-1 text-sm text-taupe" style={{ animationDelay: "0.2s" }}>
          from <span className="italic">{song.album === 1 ? "Home for Christmas" : "Wonderland"}</span>
          {listened.has(song.id) && <span className="ml-2 text-gold">· lit in the village ✦</span>}
        </p>

        {/* controls */}
        <div className="fade-up mt-6 flex items-center gap-3" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={() => toggle(song)}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-[#151515] shadow-[0_0_40px_rgba(214,153,0,0.35)] transition-transform active:scale-90"
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 14 14"><rect x="2" width="3.5" height="14" rx="1" fill="currentColor" /><rect x="8.5" width="3.5" height="14" rx="1" fill="currentColor" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 14 14" className="ml-0.5"><path d="M3 1.5 v11 L12.5 7 Z" fill="currentColor" /></svg>
            )}
          </button>
          <button
            onClick={() => toggleFavorite(song.id)}
            aria-label="Favorite"
            className={`flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm transition-colors ${
              favorites.has(song.id) ? "border-gold text-gold" : "border-white/20 text-cream hover:border-gold"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={favorites.has(song.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21c-4.8-3.6-9-6.8-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.2-4.2 7.4-9 11z" />
            </svg>
          </button>
          <button
            onClick={share}
            aria-label="Share"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-cream backdrop-blur-sm transition-colors hover:border-gold"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="5" r="2.5" /><circle cx="18" cy="19" r="2.5" />
              <path d="M8.2 10.8 L15.8 6.2 M8.2 13.2 L15.8 17.8" />
            </svg>
          </button>
          {shared && <span className="text-xs text-gold">Link copied</span>}
        </div>

        {/* story */}
        <p className="fade-up mt-8 border-l-2 border-gold/50 pl-4 font-display text-lg italic leading-relaxed text-cream/85" style={{ animationDelay: "0.4s" }}>
          {song.story}
        </p>

        {/* reactions */}
        <div className="fade-up mt-8" style={{ animationDelay: "0.6s" }}>
          <p className="text-xs tracking-[0.25em] text-taupe uppercase">How did it land?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {REACTIONS.map((r) => {
              const active = myReactions.has(r.key);
              const n = (counts.get(r.key) ?? 0) + (active ? 0 : 0);
              return (
                <button
                  key={r.key}
                  disabled={active || react.isPending}
                  onClick={() => {
                    setMyReactions((prev) => new Set(prev).add(r.key));
                    react.mutate({ songId: song.id, reaction: r.key });
                  }}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs transition-all active:scale-95 ${
                    active
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-white/15 bg-black/25 text-cream/80 backdrop-blur-sm hover:border-gold-dim"
                  }`}
                >
                  <span>{r.emoji}</span>
                  <span>{r.label}</span>
                  {n > 0 && <span className="text-taupe">{n}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* leave a christmas note */}
        <div className="fade-up mt-10 rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md" style={{ animationDelay: "0.7s" }}>
          <p className="font-display text-xl text-cream">Leave a Christmas Note</p>
          <p className="mt-1 text-xs text-taupe">What did this song remind you of?</p>
          {noteSent ? (
            <p className="fade-up mt-4 text-sm text-gold">
              Your note is hanging in the village now. Thank you. ✦
            </p>
          ) : (
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim() && message.trim()) addNote.mutate({ songId: song.id, name, message });
              }}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                maxLength={64}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-taupe focus:border-gold focus:outline-none"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A memory, a thought, a hello…"
                rows={3}
                maxLength={500}
                className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-taupe focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={addNote.isPending || !name.trim() || !message.trim()}
                className="rounded-full bg-gold px-6 py-3 text-xs font-medium tracking-[0.15em] text-[#151515] uppercase transition-transform active:scale-95 disabled:opacity-40"
              >
                Hang it in the village
              </button>
            </form>
          )}
        </div>

        {/* floating listener notes */}
        {notesQuery.data && notesQuery.data.length > 0 && (
          <div className="mt-10 space-y-4">
            <p className="text-xs tracking-[0.25em] text-taupe uppercase">Notes hanging here</p>
            {notesQuery.data.slice(0, 6).map((n, i) => (
              <div
                key={n.id}
                className="float-soft rounded-xl border border-gold-dim bg-[#1a1712]/85 p-4 backdrop-blur-sm"
                style={{ ["--tilt" as string]: `${(i % 3) - 1.5}deg`, animationDelay: `${i * 0.9}s` }}
              >
                <p className="font-display text-base italic leading-relaxed text-cream/90">"{n.message}"</p>
                <p className="mt-2 text-xs tracking-wider text-gold uppercase">— {n.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
