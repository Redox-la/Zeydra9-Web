import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const nfts = pgTable("nfts", {
  id: serial("id").primaryKey(),
  tokenId: text("token_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("available"), // available, minted, locked
  attributes: text("attributes"), // JSON string of traits
  owner: text("owner"), // wallet address if minted
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertNftSchema = createInsertSchema(nfts).omit({
  id: true,
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  ownedNfts: many(nfts),
}));

export const nftsRelations = relations(nfts, ({ one }) => ({
  ownerUser: one(users, {
    fields: [nfts.owner],
    references: [users.username],
  }),
}));

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertNft = z.infer<typeof insertNftSchema>;
export type Nft = typeof nfts.$inferSelect;
