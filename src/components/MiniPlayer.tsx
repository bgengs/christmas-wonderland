import { useNavigate } from "react-router";
import { usePlayer } from "@/store/player";

// Persistent miniature player — stays available while moving between scenes.
export default function MiniPlayer() {
  const { current, playing, elapsed, loopDur, toggle, next, favorites, toggleFavorite } = usePlayer();
  const navigate = useNavigate();

  if (!current) return null;

  const progress = Math.min(1, (elapsed % loopDur) / loopDur);
  const fav = favorites.has(current.id);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border border-gold-dim bg-[#151515]/90 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-md">
        {/* progress hairline */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-white/10">
          <div className="h-full bg-gold transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="flex items-center gap-3 px-3 py-2.5">
          <button
            onClick={() => navigate(`/song/${current.id}`)}
            className="flex min-w-0 flex-1 items-center gap-3 text-left"
            aria-label="Open current song scene"
          >
            <img
              src={current.sceneImage}
              alt=""
              className="h-11 w-11 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="truncate font-display text-base leading-tight text-cream">{current.title}</p>
              <p className="truncate text-[11px] tracking-wider text-taupe uppercase">
                {current.album === 1 ? "Home for Christmas" : "Wonderland"} · {current.location}
              </p>
            </div>
          </button>
          <button
            onClick={() => toggleFavorite(current.id)}
            aria-label="Favorite"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${fav ? "text-gold" : "text-taupe hover:text-cream"}`}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21c-4.8-3.6-9-6.8-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.2-4.2 7.4-9 11z" />
            </svg>
          </button>
          <button
            onClick={() => toggle()}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-[#151515] transition-transform active:scale-90"
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14"><rect x="2" width="3.5" height="14" rx="1" fill="currentColor" /><rect x="8.5" width="3.5" height="14" rx="1" fill="currentColor" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5 v11 L12.5 7 Z" fill="currentColor" /></svg>
            )}
          </button>
          <button
            onClick={next}
            aria-label="Next song"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-taupe transition-colors hover:text-cream sm:flex"
          >
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 2 L8 8 L2 14 Z M9 2 h2.5 v12 H9 Z" fill="currentColor" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
