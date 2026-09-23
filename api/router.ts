import { createRouter, publicQuery } from "./middleware";
import { wonderlandRouter } from "./wonderlandRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  wonderland: wonderlandRouter,
});

export type AppRouter = typeof appRouter;
