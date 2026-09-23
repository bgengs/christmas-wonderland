import type { Song } from "@/data/songs";

// Full-bleed cinematic scene: slow camera push on the artwork, mood overlay
// (aurora bands / candle glow / night vignette), film grain, bottom fade.
export default function SceneArt({ song, dim = 0.45 }: { song: Song; dim?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <img
        src={song.sceneImage}
        alt=""
        className="kenburns h-full w-full object-cover"
        draggable={false}
      />
      {/* mood overlays */}
      {song.mood === "aurora" && <div className="aurora absolute inset-x-0 top-0 h-2/5" />}
      {song.mood === "candle" && (
        <div
          className="flicker absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 45% at 50% 62%, rgba(255,170,70,0.16), transparent 70%)" }}
        />
      )}
      <div className="absolute inset-0" style={{ background: `rgba(10, 10, 14, ${dim})` }} />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${song.palette.to} 4%, transparent 45%), linear-gradient(to bottom, rgba(14,16,22,0.55), transparent 30%)` }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
