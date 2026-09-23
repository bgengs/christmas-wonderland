import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import {
  addReaction,
  createNote,
  createOrnament,
  listNotes,
  listOrnaments,
  reactionCounts,
} from "./queries/wonderland";

const clean = (s: string, max: number) => s.trim().slice(0, max);

export const wonderlandRouter = createRouter({
  listNotes: publicQuery
    .input(z.object({ songId: z.string().max(64).optional() }))
    .query(({ input }) => listNotes(input.songId)),

  addNote: publicQuery
    .input(
      z.object({
        songId: z.string().min(1).max(64),
        name: z.string().min(1).max(64),
        message: z.string().min(1).max(500),
      }),
    )
    .mutation(async ({ input }) => {
      await createNote({
        songId: input.songId,
        name: clean(input.name, 64),
        message: clean(input.message, 500),
      });
      return { ok: true };
    }),

  listOrnaments: publicQuery.query(() => listOrnaments()),

  addOrnament: publicQuery
    .input(
      z.object({
        firstName: z.string().min(1).max(64),
        message: z.string().min(1).max(300),
      }),
    )
    .mutation(async ({ input }) => {
      await createOrnament({
        firstName: clean(input.firstName, 64),
        message: clean(input.message, 300),
      });
      return { ok: true };
    }),

  react: publicQuery
    .input(
      z.object({
        songId: z.string().min(1).max(64),
        reaction: z.enum(["loved", "hit-me", "favorite", "beautiful", "remembered"]),
      }),
    )
    .mutation(async ({ input }) => {
      await addReaction(input);
      return { ok: true };
    }),

  reactionCounts: publicQuery
    .input(z.object({ songId: z.string().min(1).max(64) }))
    .query(({ input }) => reactionCounts(input.songId)),
});
