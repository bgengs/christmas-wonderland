import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Snowfall from "@/components/Snowfall";
import { ALBUMS } from "@/data/songs";

// Home: a quiet snowy night. The camera slowly approaches the glowing house;
// after a few beats we crossfade to the singer on the porch. Music stays
// faint — it begins only once the visitor chooses to step inside.
export default function Home() {
  const navigate = useNavigate();
  const [porch, setPorch] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPorch(true), 7000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-night">
      {/* hero imagery — village, then the porch */}
      <div className="absolute inset-0">
        <img
          src="/assets/scenes/hero-village.jpg"
          alt=""
          className={`kenburns-slow absolute inset-0 h-full w-full object-cover transition-opacity duration-[3000ms] ${porch ? "opacity-0" : "opacity-100"}`}
          draggable={false}
        />
        <img
          src="/assets/scenes/scene-front-porch.jpg"
          alt=""
          className={`kenburns-slow absolute inset-0 h-full w-full object-cover transition-opacity duration-[3000ms] ${porch ? "opacity-100" : "opacity-0"}`}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-[#0e1016]/40" />
        <div className="grain absolute inset-0" />
      </div>
      <Snowfall />

      <div className="relative z-10 flex min-h-screen flex-col justify-end pb-24">
        <div className="px-6 md:px-16">
          <p className="fade-up text-[11px] tracking-[0.35em] text-gold uppercase" style={{ animationDelay: "0.3s" }}>
            A living Christmas snow globe
          </p>
          <h1
            className="fade-up mt-3 font-display text-5xl leading-[1.05] text-cream md:text-7xl"
            style={{ animationDelay: "0.5s" }}
          >
            Christmas
            <br />
            <span className="italic text-gold">Wonderland</span>
          </h1>
          <p className="fade-up mt-4 max-w-md text-base text-cream/70 md:text-lg" style={{ animationDelay: "0.7s" }}>
            Two Christmas albums. One family. A different Christmas world behind every song.
          </p>

          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.9s" }}>
            <button
              onClick={() => navigate("/wonderland")}
              className="rounded-full bg-gold px-7 py-4 text-sm font-medium tracking-[0.15em] text-[#151515] uppercase transition-transform active:scale-95"
            >
              Enter Christmas Wonderland
            </button>
            <button
              onClick={() => navigate("/journey")}
              className="rounded-full border border-gold-dim px-7 py-4 text-sm tracking-[0.15em] text-cream uppercase backdrop-blur-sm transition-colors hover:border-gold active:scale-95"
            >
              Spend Christmas With Us
            </button>
          </div>
          <button
            onClick={() => navigate("/album/home-for-christmas")}
            className="fade-up mt-4 text-xs tracking-[0.25em] text-taupe uppercase underline-offset-4 hover:text-gold hover:underline"
            style={{ animationDelay: "1.1s" }}
          >
            Listen to the albums →
          </button>
        </div>
      </div>

      {/* the two records */}
      <section className="relative z-10 border-t border-white/5 bg-night px-6 py-16 md:px-16">
        <h2 className="font-display text-3xl text-cream md:text-4xl">The two albums</h2>
        <p className="mt-2 max-w-lg text-sm text-taupe">
          One warm and nostalgic. One wide and magical. Every song opens a different door.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {ALBUMS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => navigate(`/album/${a.id}`)}
              className="fade-up group text-left"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={a.cover}
                  alt={a.title}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] tracking-[0.3em] text-gold uppercase">{a.subtitle}</p>
                  <p className="font-display text-2xl text-cream">{a.title}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">{a.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
