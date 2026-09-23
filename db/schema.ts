import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

// Christmas Notes left by listeners on songs
export const notes = mysqlTable("notes", {
  id: serial("id").primaryKey(),
  songId: varchar("song_id", { length: 64 }).notNull(),
  name: varchar("name", { length: 64 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Memory Tree ornament dedications
export const ornaments = mysqlTable("ornaments", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 64 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Lightweight per-song reactions (loved / hit-me / favorite / beautiful / remembered)
export const reactions = mysqlTable("reactions", {
  id: serial("id").primaryKey(),
  songId: varchar("song_id", { length: 64 }).notNull(),
  reaction: varchar("reaction", { length: 32 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
