import Snowfall from "@/components/Snowfall";
import { songById } from "@/data/songs";
import { trpc } from "@/providers/trpc";
import { useNavigate } from "react-router";

// Christmas Notes — listener messages as floating cards pinned across the
// village, instead of a comment feed.
export default function Notes() {
  const notesQuery = trpc.wonderland.listNotes.useQuery({});
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-night">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #0e1016 0%, #17131c 60%, #1c1620 100%)" }}
      />
      <Snowfall density={0.5} />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 pb-44 pt-24">
        <p className="text-center text-[11px] tracking-[0.35em] text-gold uppercase">From everyone who stopped by</p>
        <h1 className="mt-2 text-center font-display text-4xl text-cream">Christmas Notes</h1>
        <p className="mx-auto mt-3 max-w-sm text-center text-sm text-cream/60">
          Little messages listeners hung across the village — memories, hellos, and the people songs brought back.
        </p>

        {notesQuery.isLoading && <p className="mt-16 text-center text-sm text-taupe">Gathering the notes…</p>}

        {notesQuery.data && notesQuery.data.length === 0 && (
          <div className="mt-16 text-center">
            <p className="font-display text-2xl italic text-cream/70">The tree is still waiting for its first note.</p>
            <p className="mt-2 text-sm text-taupe">Open any song and leave one — it will hang here for everyone.</p>
          </div>
        )}

        <div className="mt-10 columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
          {notesQuery.data?.map((n, i) => {
            const song = songById(n.songId);
            return (
              <button
                key={n.id}
                onClick={() => song && navigate(`/song/${song.id}`)}
                className="float-soft block w-full break-inside-avoid rounded-xl border border-gold-dim bg-[#1a1712]/85 p-5 text-left backdrop-blur-sm transition-colors hover:border-gold"
                style={{ ["--tilt" as string]: `${((i % 5) - 2) * 0.8}deg`, animationDelay: `${(i % 6) * 0.7}s` }}
              >
                <p className="font-display text-lg italic leading-relaxed text-cream/90">"{n.message}"</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs tracking-wider text-gold uppercase">— {n.name}</p>
                  {song && <p className="text-[10px] tracking-wider text-taupe uppercase">{song.title}</p>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
