import { useNavigate, useParams } from "react-router";
import Snowfall from "@/components/Snowfall";
import { ALBUMS, albumSongs } from "@/data/songs";
import { usePlayer } from "@/store/player";

export default function Album() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const album = ALBUMS.find((a) => a.id === id) ?? ALBUMS[0];
  const songs = albumSongs(album.num);
  const { current, playing, toggle, listened } = usePlayer();
  const other = ALBUMS.find((a) => a.id !== album.id)!;

  return (
    <div className="relative min-h-screen bg-night">
      <div className="grain fixed inset-0" />
      <Snowfall density={0.5} className="fixed" />

      {/* cover header */}
      <div className="relative">
        <img src={album.cover} alt="" className="h-[46vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-[#0e1016]/30 to-[#0e1016]/40" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-16">
          <p className="text-[11px] tracking-[0.35em] text-gold uppercase">{album.subtitle}</p>
          <h1 className="mt-1 font-display text-4xl text-cream md:text-6xl">{album.title}</h1>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 pb-44 pt-6 md:px-0">
        <p className="text-sm leading-relaxed text-cream/65">{album.description}</p>

        <div className="mt-8 divide-y divide-white/5 border-y border-white/5">
          {songs.map((s) => {
            const isCurrent = current?.id === s.id && playing;
            return (
              <div
                key={s.id}
                className="group flex items-center gap-4 py-4 transition-colors hover:bg-white/[0.03]"
              >
                <button
                  onClick={() => toggle(s)}
                  aria-label={isCurrent ? `Pause ${s.title}` : `Play ${s.title}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-dim text-gold transition-all hover:bg-gold hover:text-[#151515]"
                >
                  {isCurrent ? (
                    <svg width="12" height="12" viewBox="0 0 14 14"><rect x="2" width="3.5" height="14" rx="1" fill="currentColor" /><rect x="8.5" width="3.5" height="14" rx="1" fill="currentColor" /></svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 14 14" className="ml-0.5"><path d="M3 1.5 v11 L12.5 7 Z" fill="currentColor" /></svg>
                  )}
                </button>
                <button onClick={() => navigate(`/song/${s.id}`)} className="min-w-0 flex-1 text-left">
                  <p className="flex items-center gap-2 font-display text-xl text-cream transition-colors group-hover:text-gold">
                    <span className="text-xs text-taupe">{String(s.track).padStart(2, "0")}</span>
                    <span className="truncate">{s.title}</span>
                    {listened.has(s.id) && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold glow-orb" aria-label="lit" />}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-taupe">{s.location}</p>
                </button>
                <img
                  src={s.sceneImage}
                  alt=""
                  loading="lazy"
                  className="h-14 w-14 shrink-0 cursor-pointer rounded-lg object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  onClick={() => navigate(`/song/${s.id}`)}
                />
              </div>
            );
          })}
        </div>

        {/* cross-link to the other album */}
        <button
          onClick={() => navigate(`/album/${other.id}`)}
          className="group mt-10 flex w-full items-center gap-4 overflow-hidden rounded-xl border border-white/10 p-4 text-left transition-colors hover:border-gold-dim"
        >
          <img src={other.cover} alt="" className="h-16 w-16 rounded-lg object-cover" loading="lazy" />
          <div>
            <p className="text-[10px] tracking-[0.3em] text-taupe uppercase">Continue to</p>
            <p className="font-display text-xl text-cream group-hover:text-gold">{other.title}</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" className="ml-auto text-taupe group-hover:text-gold"><path d="M6 2 L12 8 L6 14" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
        </button>
      </div>
    </div>
  );
}
