# Christmas Wonderland

An immersive, mobile-first interactive Christmas music experience — less an artist website, more stepping inside a living Christmas snow globe.

Two Christmas albums. One family. A different Christmas world behind every song.

## The Experience

- **The Village (Christmas Map)** — an illustrated interactive winter village. Ten locations, two songs living at each; as you listen, lights appear across the village until the whole Wonderland glows.
- **Twenty song scenes** — every track owns a cinematic full-bleed scene (the front porch, the fireplace, the Christmas train, Northern Lights over the frozen lake, a candlelit chapel, the Giving Tree, a Memory Garden…), with the story behind the song, reactions, and listener notes hanging like cards.
- **Real recordings** — Album One "Home for Christmas" (nine beloved classics plus the original *Be Like Brit Christmas*) and Album Two "Wonderland" (eleven original songs, from *No Name on It* to *Noel en Haïti*), streamed in the persistent player with ambience beds underneath.
- **Spend Christmas With Us** — a hands-off cinematic autoplay journey through six songs; an interactive Christmas television special.
- **The Memory Tree** — dedicate a glowing ornament to someone you miss. Tapping ornaments reveals their messages.
- **Christmas Notes** — listener messages as floating cards instead of a comment feed.
- **Persistent mini player** — music keeps playing while you wander between scenes, and drifts into the next song when one ends.

## Tech

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS, canvas snowfall with pointer parallax, film grain, Ken Burns scene cinematography.
- **Audio**: the real album recordings (web-optimized streams in `public/assets/audio/songs/`) over looping ambient beds (fireplace, winter wind, music box).
- **Backend**: Hono + tRPC 11 + Drizzle ORM (MySQL) — notes, Memory Tree ornaments, and per-song reactions persist in the database.
- **Imagery**: AI-generated cinematic scene artwork in `public/assets/`, plus the singer's photos and 360° turnaround video.

## Develop

```bash
npm install
npm run db:push   # sync schema (needs DATABASE_URL in .env)
npm run dev       # http://localhost:3000
```

## Build & run

```bash
npm run build
npm start
```

Or with Docker:

```bash
docker build -t christmas-wonderland .
docker run -p 3000:3000 --env-file .env christmas-wonderland
```

## Notes

- `.env` is required (see `.env.example`) and is intentionally not committed.
- `package-lock.json` and the binary media under `public/assets/` are delivered with the platform deployment rather than this repository; run `npm install` to regenerate the lockfile.
- `src/components/ui/` contains only the shadcn/ui components the app actually imports; add more any time with `npx shadcn@latest add <name>`.
- "Christmas isn't one perfect day. It's the people we carry with us."
