import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import SceneArt from "@/components/SceneArt";
import Snowfall from "@/components/Snowfall";
import { songById } from "@/data/songs";
import { usePlayer } from "@/store/player";

// ─── Spend Christmas With Us ─────────────────────────────────────────────────
// A cinematic autoplay journey: scenes, songs and title cards change on their
// own — an interactive Christmas television special.

const SCENE_SECONDS = 30;
const JOURNEY = [
  "you-never-forgot-us",
  "the-first-noel",
  "together-once-more",
  "o-holy-night",
  "no-name-on-it",
  "love-is-still-watching",
];

export default function Journey() {
  const navigate = useNavigate();
  const { play, toggle, playing } = usePlayer();
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const timer = useRef<number | null>(null);

  const song = songById(JOURNEY[step])!;

  useEffect(() => {
    if (!started || finished) return;
    play(song);
    timer.current = window.setTimeout(() => {
      if (step < JOURNEY.length - 1) setStep((s) => s + 1);
      else setFinished(true);
    }, SCENE_SECONDS * 1000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, started, finished]);

  if (!started) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-night px-6">
        <img src="/assets/scenes/scene-fireplace.jpg" alt="" className="kenburns-slow absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-[#0e1016]/40 to-[#0e1016]/60" />
        <div className="grain absolute inset-0" />
        <Snowfall />
        <div className="fade-up relative z-10 max-w-md text-center">
          <p className="text-[11px] tracking-[0.35em] text-gold uppercase">Our Christmas</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-cream md:text-5xl">
            Spend Christmas<br /><span className="italic text-gold">With Us</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            No navigating, no choices. Six songs, six worlds — sit back and let Christmas come to you, the way it does in our house.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="mt-8 rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-[0.15em] text-[#151515] uppercase transition-transform active:scale-95"
          >
            Begin the journey
          </button>
          <p className="mt-4 text-[11px] tracking-wider text-taupe uppercase">Sound on ✦ about three minutes</p>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-night px-6">
        <img src="/assets/scenes/hero-village.jpg" alt="" className="kenburns-slow absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-[#0e1016]/50" />
        <div className="grain absolute inset-0" />
        <Snowfall density={1.2} />
        <div className="fade-up relative z-10 max-w-md text-center">
          <p className="font-display text-3xl leading-snug text-cream md:text-4xl">
            "Christmas isn't one perfect day.<br />
            <span className="italic text-gold">It's the people we carry with us."</span>
          </p>
          <p className="mt-4 text-sm text-taupe">Thank you for spending Christmas with our family.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => { setFinished(false); setStep(0); }}
              className="rounded-full bg-gold px-6 py-3.5 text-xs font-medium tracking-[0.15em] text-[#151515] uppercase"
            >
              Replay Christmas
            </button>
            <button
              onClick={() => navigate("/wonderland")}
              className="rounded-full border border-gold-dim px-6 py-3.5 text-xs tracking-[0.15em] text-cream uppercase hover:border-gold"
            >
              Explore the Village
            </button>
            <button
              onClick={() => navigate("/memory-tree")}
              className="rounded-full border border-gold-dim px-6 py-3.5 text-xs tracking-[0.15em] text-cream uppercase hover:border-gold"
            >
              Memory Tree
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-night">
      <div className="scene-crossfade" key={song.id}>
        <SceneArt song={song} dim={0.4} />
      </div>
      <Snowfall density={0.7} />

      {/* exit */}
      <button
        onClick={() => navigate("/wonderland")}
        className="fixed right-4 top-20 z-30 flex h-11 items-center gap-2 rounded-full border border-gold-dim bg-black/30 px-4 text-xs tracking-wider text-cream uppercase backdrop-blur-sm hover:border-gold"
      >
        Leave journey
      </button>

      {/* title card */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-32">
        <div className="mx-auto max-w-xl text-center" key={`card-${song.id}`}>
          <p className="fade-up text-[11px] tracking-[0.35em] text-gold uppercase">
            {step + 1} of {JOURNEY.length} · {song.location}
          </p>
          <h2 className="fade-up mt-2 font-display text-4xl text-cream md:text-5xl" style={{ animationDelay: "0.15s" }}>
            {song.title}
          </h2>
          <div className="fade-up mt-6 flex items-center justify-center gap-4" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => toggle(song)}
              aria-label={playing ? "Pause" : "Play"}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-[#151515] transition-transform active:scale-90"
            >
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 14 14"><rect x="2" width="3.5" height="14" rx="1" fill="currentColor" /><rect x="8.5" width="3.5" height="14" rx="1" fill="currentColor" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 14 14" className="ml-0.5"><path d="M3 1.5 v11 L12.5 7 Z" fill="currentColor" /></svg>
              )}
            </button>
            <button
              onClick={() => (step < JOURNEY.length - 1 ? setStep(step + 1) : setFinished(true))}
              className="rounded-full border border-white/25 px-5 py-3 text-xs tracking-[0.2em] text-cream uppercase backdrop-blur-sm hover:border-gold"
            >
              Next world →
            </button>
          </div>
          {/* journey progress */}
          <div className="mt-6 flex justify-center gap-2">
            {JOURNEY.map((id, i) => (
              <span
                key={id}
                className={`h-1 rounded-full transition-all duration-500 ${i === step ? "w-8 bg-gold" : i < step ? "w-3 bg-gold/50" : "w-3 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
