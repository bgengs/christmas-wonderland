import { useState } from "react";
import { useNavigate } from "react-router";
import { usePlayer } from "@/store/player";

// Revealed when the whole Wonderland is lit.
export default function Finale() {
  const navigate = useNavigate();
  const { resetJourney, markFinaleSeen, finaleSeen } = usePlayer();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || finaleSeen) return null;

  const close = () => {
    markFinaleSeen();
    setDismissed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0e1016]/85 px-6 backdrop-blur-md">
      <div className="fade-up max-w-md text-center">
        <div className="mx-auto mb-6 flex justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="flicker h-2 w-2 rounded-full bg-gold glow-orb"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
          ))}
        </div>
        <p className="font-display text-3xl leading-snug text-cream md:text-4xl">
          "Christmas isn't one perfect day.
          <br />
          <span className="italic text-gold">It's the people we carry with us."</span>
        </p>
        <p className="mt-4 text-sm text-taupe">You lit the whole village. Thank you for spending Christmas here.</p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={() => { resetJourney(); close(); }}
            className="rounded-full border border-gold-dim px-4 py-3 text-xs tracking-[0.15em] text-cream uppercase hover:border-gold"
          >
            Replay Christmas
          </button>
          <button
            onClick={() => { close(); navigate("/notes"); }}
            className="rounded-full border border-gold-dim px-4 py-3 text-xs tracking-[0.15em] text-cream uppercase hover:border-gold"
          >
            Leave a Note
          </button>
          <button
            onClick={() => { close(); navigate("/memory-tree"); }}
            className="rounded-full border border-gold-dim px-4 py-3 text-xs tracking-[0.15em] text-cream uppercase hover:border-gold"
          >
            Dedicate an Ornament
          </button>
          <button
            onClick={() => { close(); navigate("/album/home-for-christmas"); }}
            className="rounded-full bg-gold px-4 py-3 text-xs font-medium tracking-[0.15em] text-[#151515] uppercase"
          >
            Listen Again
          </button>
        </div>
      </div>
    </div>
  );
}
