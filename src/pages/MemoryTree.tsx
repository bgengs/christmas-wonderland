import { useMemo, useState } from "react";
import Snowfall from "@/components/Snowfall";
import { trpc } from "@/providers/trpc";

// ─── The Memory Tree ─────────────────────────────────────────────────────────
// Dedicate a glowing ornament to someone you miss. Tapping ornaments reveals
// their messages. Gentle, beautiful, optional.

const ORNAMENT_COLORS = ["#ffd27a", "#ffb3a0", "#a0d8ff", "#c3f0c2", "#e8c2ff", "#ffe9a0"];

export default function MemoryTree() {
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);

  const utils = trpc.useUtils();
  const ornamentsQuery = trpc.wonderland.listOrnaments.useQuery();
  const addOrnament = trpc.wonderland.addOrnament.useMutation({
    onSuccess: () => {
      setSent(true);
      setFirstName("");
      setMessage("");
      utils.wonderland.listOrnaments.invalidate();
    },
  });

  // deterministic-ish placement on the tree canopy
  const placements = useMemo(() => {
    const items = ornamentsQuery.data ?? [];
    return items.map((o, i) => {
      const seed = (o.id * 2654435761) % 1000 / 1000;
      const row = Math.floor(i / 7);
      const y = 22 + ((i * 137) % 56); // % down the canopy
      const spread = 8 + y * 0.62; // tree widens downward
      const x = 50 + (seed - 0.5) * 2 * spread * 0.72;
      return { o, x, y: Math.min(y + row * 2, 80), color: ORNAMENT_COLORS[o.id % ORNAMENT_COLORS.length] };
    });
  }, [ornamentsQuery.data]);

  const open = placements.find((p) => p.o.id === openId);

  return (
    <div className="relative min-h-screen overflow-hidden bg-night">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #0b0a14 0%, #14101f 55%, #1c1622 100%)" }}
      />
      {/* the single bright star */}
      <div className="flicker absolute left-1/2 top-[7%] h-2 w-2 -translate-x-1/2 rounded-full bg-[#fff3d0] glow-orb" />
      <Snowfall density={0.55} />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-md px-6 pb-44 pt-24">
        <p className="text-center text-[11px] tracking-[0.35em] text-gold uppercase">A quiet place</p>
        <h1 className="mt-2 text-center font-display text-4xl text-cream">The Memory Tree</h1>
        <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-relaxed text-cream/60">
          For the people we carry with us. Hang an ornament for someone you miss — its light stays on the tree.
        </p>

        {/* tree */}
        <div className="relative mx-auto mt-8 aspect-[4/5] max-w-sm">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <radialGradient id="treeGlow" cx="50%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#2a2438" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <ellipse cx="50" cy="50" rx="46" ry="46" fill="url(#treeGlow)" />
            <path d="M50 8 L63 30 H57 L68 48 H61 L73 66 H27 L39 48 H32 L43 30 H37 Z" fill="#15251c" stroke="#22382c" strokeWidth="0.6" />
            <rect x="46" y="66" width="8" height="10" fill="#2a1e14" />
            <ellipse cx="50" cy="78" rx="26" ry="4" fill="#22304a" opacity="0.7" />
          </svg>
          {placements.map(({ o, x, y, color }) => (
            <button
              key={o.id}
              onClick={() => setOpenId(o.id)}
              aria-label={`Ornament for ${o.firstName}`}
              className="flicker absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform hover:scale-150"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                background: color,
                boxShadow: `0 0 10px 3px ${color}88, 0 0 24px 8px ${color}33`,
                animationDelay: `${(o.id % 9) * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* revealed message */}
        {open && (
          <div className="fade-up fixed inset-x-4 bottom-28 z-40 mx-auto max-w-sm rounded-2xl border border-gold-dim bg-[#1a1612]/95 p-5 backdrop-blur-md">
            <button
              onClick={() => setOpenId(null)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-taupe hover:text-cream"
            >
              <svg width="11" height="11" viewBox="0 0 14 14"><path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.4" /></svg>
            </button>
            <p className="text-[10px] tracking-[0.3em] text-gold uppercase">For {open.o.firstName}</p>
            <p className="mt-2 font-display text-lg italic leading-relaxed text-cream/90">"{open.o.message}"</p>
          </div>
        )}

        {/* dedicate form */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
          <p className="font-display text-xl text-cream">Dedicate an ornament</p>
          {sent ? (
            <div className="fade-up mt-3">
              <p className="text-sm text-gold">Its light is on the tree now. ✦</p>
              <button onClick={() => setSent(false)} className="mt-2 text-xs text-taupe underline underline-offset-4 hover:text-cream">
                Hang another
              </button>
            </div>
          ) : (
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (firstName.trim() && message.trim()) addOrnament.mutate({ firstName, message });
              }}
            >
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name of someone you miss"
                maxLength={64}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-taupe focus:border-gold focus:outline-none"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A short message for them…"
                rows={3}
                maxLength={300}
                className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-taupe focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={addOrnament.isPending || !firstName.trim() || !message.trim()}
                className="rounded-full bg-gold px-6 py-3 text-xs font-medium tracking-[0.15em] text-[#151515] uppercase transition-transform active:scale-95 disabled:opacity-40"
              >
                Hang it on the tree
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
