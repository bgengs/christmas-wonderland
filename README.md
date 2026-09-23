# Christmas Wonderland

An immersive, mobile-first interactive Christmas music experience — less an artist website, more stepping inside a living Christmas snow globe.

Two original Christmas albums. One family. A different Christmas world behind every song.

## The Experience

- **The Village (Christmas Map)** — an illustrated interactive winter village. Each location is a song's world; as you listen, lights appear across the village until the whole Wonderland glows.
- **Ten song scenes** — every track owns a cinematic full-bleed scene (Christmas morning, the fireplace, the Christmas train, Northern Lights, a candlelit chapel, the Giving Tree, a Memory Garden…), with lyrics, the story behind the song, reactions, and listener notes hanging like cards.
- **Spend Christmas With Us** — a hands-off cinematic autoplay journey through six songs; an interactive Christmas television special.
- **The Memory Tree** — dedicate a glowing ornament to someone you miss. Tapping ornaments reveals their messages.
- **Christmas Notes** — listener messages as floating cards instead of a comment feed.
- **Persistent mini player** — music keeps playing while you wander between scenes.

## Tech

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS, canvas snowfall with pointer parallax, film grain, Ken Burns scene cinematography.
- **Audio**: original generative music-box arrangements rendered live with the Web Audio API (plucked melody + pad + generated hall reverb), over looping ambient beds (fireplace, winter wind, music box).
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
- "Christmas isn't one perfect day. It's the people we carry with us."
