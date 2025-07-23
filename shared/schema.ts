// shared/schema.ts

import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  decimal,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: text("email").notNull(),
});

// NFTs Table
export const nfts = pgTable("nfts", {
  id: serial("id").primaryKey(),
  tokenId: text("token_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("available"), // available, minted, locked
  attributes: text("attributes"), // JSON string of traits
  owner: text("owner"), // wallet address or username
});

// Zod Validation Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
});

export const insertNftSchema = createInsertSchema(nfts).omit({
  id: true,
});

// Table Relations
export const usersRelations = relations(users, ({ many }) => ({
  ownedNfts: many(nfts),
}));

export const nftsRelations = relations(nfts, ({ one }) => ({
  ownerUser: one(users, {
    fields: [nfts.owner],
    references: [users.username],
  }),
}));

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertNft = z.infer<typeof insertNftSchema>;
export type Nft = typeof nfts.$inferSelect;