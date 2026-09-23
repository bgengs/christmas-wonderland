import { useMemo } from "react";
import { useNavigate } from "react-router";
import Snowfall from "@/components/Snowfall";
import Finale from "@/components/Finale";
import { SONGS } from "@/data/songs";
import { usePlayer } from "@/store/player";

// ─── The Christmas Map ───────────────────────────────────────────────────────
// An illustrated winter village. Each location is a song's world; as visitors
// listen, lights appear across the village until the whole Wonderland glows.

const SPOTS: Record<string, { x: number; y: number; icon: "house" | "window" | "mail" | "chapel" | "train" | "tree" | "lake" | "garden" }> = {
  "christmas-morning": { x: 200, y: 268, icon: "house" },
  "cookies-in-the-kitchen": { x: 148, y: 318, icon: "window" },
  "the-fireplace-song": { x: 252, y: 318, icon: "window" },
  "letters-to-santa": { x: 88, y: 222, icon: "mail" },
  "front-porch-lights": { x: 200, y: 348, icon: "window" },
  "northern-lights": { x: 108, y: 512, icon: "lake" },
  "the-christmas-train": { x: 66, y: 428, icon: "train" },
  "candlelight-chapel": { x: 312, y: 196, icon: "chapel" },
  "the-giving-tree": { x: 316, y: 372, icon: "tree" },
  "memory-garden": { x: 292, y: 536, icon: "garden" },
};

function Pines({ y, opacity }: { y: number; opacity: number }) {
  const trees = [];
  for (let i = 0; i < 14; i++) {
    const x = i * 31 + (i % 2) * 9;
    const h = 26 + ((i * 37) % 22);
    trees.push(
      <path
        key={i}
        d={`M ${x} ${y} L ${x + 8} ${y - h} L ${x + 16} ${y} Z M ${x + 2} ${y - h * 0.35} L ${x + 8} ${y - h * 1.25} L ${x + 14} ${y - h * 0.35} Z`}
        fill="#1d2b3d"
        opacity={opacity}
      />,
    );
  }
  return <>{trees}</>;
}

function Icon({ type, lit }: { type: string; lit: boolean }) {
  const c = lit ? "#ffd27a" : "#7d7466";
  switch (type) {
    case "house":
      return (
        <g stroke={c} strokeWidth="2" fill="none" strokeLinejoin="round">
          <path d="M -16 4 L 0 -12 L 16 4" />
          <path d="M -11 2 V 14 H 11 V 2" />
          {lit && <rect x="-4" y="5" width="8" height="9" fill="#ffd27a" opacity="0.85" className="flicker" stroke="none" />}
        </g>
      );
    case "chapel":
      return (
        <g stroke={c} strokeWidth="2" fill="none" strokeLinejoin="round">
          <path d="M -10 14 V -2 L 0 -12 L 10 -2 V 14 Z" />
          <path d="M 0 -12 V -18 M -3 -15 H 3" />
          {lit && <circle cx="0" cy="4" r="3" fill="#ffd27a" stroke="none" className="flicker" />}
        </g>
      );
    case "tree":
      return (
        <g stroke={c} strokeWidth="2" fill="none" strokeLinejoin="round">
          <path d="M 0 -18 L 9 -4 H 4 L 11 6 H -11 L -4 -4 H -9 Z" />
          <path d="M 0 6 V 13" />
          {lit && (
            <g fill="#ffd27a" stroke="none" className="flicker">
              <circle cx="-3" cy="-6" r="1.4" /><circle cx="4" cy="0" r="1.4" /><circle cx="0" cy="-12" r="1.4" /><circle cx="-5" cy="3" r="1.4" />
            </g>
          )}
        </g>
      );
    case "train":
      return (
        <g stroke={c} strokeWidth="2" fill="none" strokeLinejoin="round">
          <rect x="-14" y="-6" width="20" height="12" rx="2" />
          <path d="M 6 -6 V -12 H 12 V -6 M -14 8 H 12" />
          <circle cx="-8" cy="9" r="2.5" /><circle cx="4" cy="9" r="2.5" />
          {lit && <rect x="-11" y="-3" width="5" height="4" fill="#ffd27a" stroke="none" className="flicker" />}
        </g>
      );
    case "mail":
      return (
        <g stroke={c} strokeWidth="2" fill="none" strokeLinejoin="round">
          <rect x="-11" y="-8" width="22" height="15" rx="2" />
          <path d="M -11 -7 L 0 2 L 11 -7" />
          {lit && <circle cx="9" cy="-9" r="2.4" fill="#ffd27a" stroke="none" className="flicker" />}
        </g>
      );
    case "lake":
      return (
        <g stroke={c} strokeWidth="2" fill="none">
          <ellipse cx="0" cy="2" rx="17" ry="7" />
          {lit && <path d="M -10 1 Q 0 -6 10 1" stroke="#9fe8d0" className="flicker" />}
        </g>
      );
    case "garden":
      return (
        <g stroke={c} strokeWidth="2" fill="none" strokeLinejoin="round">
          <path d="M 0 -14 V 12 M 0 -14 Q 8 -12 8 -4 M 0 -14 Q -8 -12 -8 -4" />
          {lit && (
            <g fill="#ffd27a" stroke="none">
              <circle cx="8" cy="-2" r="2.6" className="flicker glow-orb" />
              <circle cx="-8" cy="-2" r="2.6" className="flicker" style={{ animationDelay: "0.8s" }} />
            </g>
          )}
          {!lit && (<><circle cx="8" cy="-2" r="2.2" fill="none" /><circle cx="-8" cy="-2" r="2.2" fill="none" /></>)}
        </g>
      );
    default: // window — a small warm window marker
      return (
        <g stroke={c} strokeWidth="2" fill="none">
          <rect x="-7" y="-9" width="14" height="18" rx="2" />
          <path d="M 0 -9 V 9 M -7 0 H 7" />
          {lit && <rect x="-5" y="-7" width="10" height="16" fill="#ffd27a" opacity="0.8" stroke="none" className="flicker" />}
        </g>
      );
  }
}

export default function Wonderland() {
  const navigate = useNavigate();
  const { listened } = usePlayer();
  const litCount = SONGS.filter((s) => listened.has(s.id)).length;
  const allLit = litCount === SONGS.length;
  const brightness = useMemo(() => 0.55 + (litCount / SONGS.length) * 0.45, [litCount]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-night">
      {/* sky brightens as the village lights up */}
      <div
        className="absolute inset-0 transition-[opacity] duration-1000"
        style={{ background: "linear-gradient(to bottom, #0a0e1c 0%, #101a2e 45%, #1a2233 100%)", opacity: brightness }}
      />
      <div className="aurora absolute inset-x-0 top-0 h-56 opacity-70" />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-md px-4 pb-40 pt-24 md:max-w-lg">
        <p className="text-center text-[11px] tracking-[0.35em] text-gold uppercase">The Christmas Map</p>
        <h1 className="mt-2 text-center font-display text-4xl text-cream">The Village</h1>
        <p className="mt-2 text-center text-sm text-taupe">
          {litCount === 0
            ? "Every song you hear lights another window."
            : allLit
              ? "The whole Wonderland is glowing."
              : `${litCount} of ${SONGS.length} lights are shining.`}
        </p>

        {/* progress of lights */}
        <div className="mx-auto mt-4 flex max-w-[240px] justify-center gap-1.5">
          {SONGS.map((s) => (
            <span
              key={s.id}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-700 ${listened.has(s.id) ? "bg-gold glow-orb" : "bg-white/15"}`}
            />
          ))}
        </div>

        <svg viewBox="0 0 400 640" className="mt-6 w-full" role="img" aria-label="Illustrated winter village map">
          <defs>
            <radialGradient id="spotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffc85e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffc85e" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#33446a" />
              <stop offset="100%" stopColor="#263453" />
            </linearGradient>
          </defs>

          {/* stars */}
          {Array.from({ length: 40 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 97) % 400}
              cy={(i * 53) % 200}
              r={i % 5 === 0 ? 1.4 : 0.8}
              fill="#fef1e8"
              opacity={0.25 + ((i * 13) % 40) / 100 + (allLit ? 0.25 : 0)}
              className={i % 3 === 0 ? "flicker" : undefined}
              style={{ animationDelay: `${(i % 7) * 0.4}s` }}
            />
          ))}
          {/* moon */}
          <circle cx="338" cy="72" r="22" fill="#f4ead8" opacity="0.9" />
          <circle cx="330" cy="66" r="20" fill="#0d1322" opacity="0.35" />

          <Pines y={190} opacity={0.8} />
          <path d="M0 210 Q 120 170 240 205 T 400 195 V 640 H 0 Z" fill="url(#hill)" />
          <Pines y={330} opacity={0.55} />
          <path d="M0 360 Q 140 320 280 355 T 400 345 V 640 H 0 Z" fill="#2c3c61" />
          <path d="M0 470 Q 160 430 400 465 V 640 H 0 Z" fill="#35476f" />
          <path d="M0 590 Q 200 560 400 585 V 640 H 0 Z" fill="#3f5480" />

          {/* train track curve */}
          <path d="M 10 452 Q 120 430 220 452 T 400 446" stroke="#5a6c92" strokeWidth="2" fill="none" strokeDasharray="6 5" />
          {/* frozen lake */}
          <ellipse cx="108" cy="528" rx="58" ry="20" fill="#4a6494" opacity="0.9" />
          <ellipse cx="108" cy="524" rx="46" ry="13" fill="#6f8cc2" opacity="0.55" />

          {/* song locations */}
          {SONGS.map((s) => {
            const spot = SPOTS[s.id];
            const lit = listened.has(s.id);
            return (
              <g
                key={s.id}
                transform={`translate(${spot.x}, ${spot.y})`}
                onClick={() => navigate(`/song/${s.id}`)}
                className="cursor-pointer"
                role="button"
                aria-label={`${s.location} — ${s.title}`}
              >
                {lit && <circle r="30" fill="url(#spotGlow)" />}
                <Icon type={spot.icon} lit={lit} />
                <text
                  y="32"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={lit ? "#ffdca0" : "#a89e8d"}
                  style={{ fontFamily: "Jost, sans-serif", letterSpacing: "0.06em" }}
                >
                  {s.location}
                </text>
                {/* generous tap target */}
                <circle r="30" fill="transparent" />
              </g>
            );
          })}
        </svg>

        <p className="mt-2 text-center text-xs text-taupe">
          Tap a place to step inside its song.
        </p>
      </div>

      <Snowfall density={0.8} />
      {allLit && <Finale />}
    </div>
  );
}
