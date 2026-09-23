import Snowfall from "@/components/Snowfall";

export default function About() {
  return (
    <div className="relative min-h-screen bg-night">
      <div className="grain fixed inset-0" />
      <Snowfall density={0.45} className="fixed" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 pb-44 pt-24">
        <p className="text-center text-[11px] tracking-[0.35em] text-gold uppercase">About</p>
        <h1 className="mt-2 text-center font-display text-4xl text-cream">The family behind the songs</h1>

        {/* portrait + 360 */}
        <div className="mt-10 grid items-start gap-6 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img src="/assets/singer/portrait.jpg" alt="Britney" className="w-full object-cover" />
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
            <video
              src="/assets/singer/singer-360.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full object-cover"
            />
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[10px] tracking-[0.25em] text-cream/80 uppercase backdrop-blur-sm">
              360° — in the round
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-5 font-display text-xl leading-relaxed text-cream/85">
          <p>
            Britney never meant to make a Christmas album. She meant to make{" "}
            <span className="italic text-gold">one song</span> — a lullaby for her kids on the
            December night the first real snow fell. They made her sing it again the next year.
            And the year after that.
          </p>
          <p>
            Ten years later there are two albums. The first,{" "}
            <span className="italic">Home for Christmas</span>, is the house itself — the fireplace,
            the kitchen chaos, the letters, the porch lights. The second,{" "}
            <span className="italic">Wonderland</span>, is everything the kids imagine once the
            lights go out: trains in the snow, Northern Lights, a tree the whole town secretly
            decorates with gifts.
          </p>
          <p>
            The children you hear laughing between the songs are hers. The giving tree is real —
            a tradition from a town that believes kindness shouldn't sign its name, and a cause
            close to this family's heart all year round. And the last lantern in the Memory
            Garden is for the people they still set a place for, every single Christmas.
          </p>
          <p className="border-l-2 border-gold/50 pl-4 italic text-cream/70">
            "Christmas isn't one perfect day. It's the people we carry with us."
          </p>
        </div>

        {/* photo strip */}
        <div className="mt-10 grid grid-cols-3 gap-3">
          {["front", "side", "back"].map((v) => (
            <div key={v} className="overflow-hidden rounded-xl border border-white/10">
              <img
                src={`/assets/singer/${v}.jpg`}
                alt={`Britney — ${v} view`}
                loading="lazy"
                className="aspect-[9/16] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] tracking-[0.25em] text-taupe uppercase">
          The woman you'll meet all over the Wonderland
        </p>
      </div>
    </div>
  );
}
