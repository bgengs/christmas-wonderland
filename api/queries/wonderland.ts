import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "./connection";
import { notes, ornaments, reactions } from "@db/schema";

export function listNotes(songId?: string) {
  const db = getDb();
  const base = db.select().from(notes).orderBy(desc(notes.createdAt)).limit(60);
  return songId ? base.where(eq(notes.songId, songId)) : base;
}

export function createNote(input: { songId: string; name: string; message: string }) {
  return getDb().insert(notes).values(input);
}

export function listOrnaments() {
  return getDb().select().from(ornaments).orderBy(desc(ornaments.createdAt)).limit(200);
}

export function createOrnament(input: { firstName: string; message: string }) {
  return getDb().insert(ornaments).values(input);
}

export function addReaction(input: { songId: string; reaction: string }) {
  return getDb().insert(reactions).values(input);
}

export async function reactionCounts(songId: string) {
  const rows = await getDb()
    .select({ reaction: reactions.reaction, count: sql<number>`count(*)` })
    .from(reactions)
    .where(eq(reactions.songId, songId))
    .groupBy(reactions.reaction);
  return rows;
}
