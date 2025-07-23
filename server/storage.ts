import { users, nfts, type User, type InsertUser, type Nft, type InsertNft } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // NFT methods
  getAllNfts(): Promise<Nft[]>;
  getNft(id: number): Promise<Nft | undefined>;
  createNft(nft: InsertNft): Promise<Nft>;
  updateNftStatus(id: number, status: string, owner?: string): Promise<Nft | undefined>;
  getCollectionStats(): Promise<{
    total: number;
    available: number;
    minted: number;
    totalVolume: string;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllNfts(): Promise<Nft[]> {
    return await db.select().from(nfts);
  }

  async getNft(id: number): Promise<Nft | undefined> {
    const [nft] = await db.select().from(nfts).where(eq(nfts.id, id));
    return nft || undefined;
  }

  async createNft(insertNft: InsertNft): Promise<Nft> {
    const [nft] = await db
      .insert(nfts)
      .values(insertNft)
      .returning();
    return nft;
  }

  async updateNftStatus(id: number, status: string, owner?: string): Promise<Nft | undefined> {
    const [nft] = await db
      .update(nfts)
      .set({ status, owner })
      .where(eq(nfts.id, id))
      .returning();
    return nft || undefined;
  }

  async getCollectionStats(): Promise<{
    total: number;
    available: number;
    minted: number;
    totalVolume: string;
  }> {
    const allNfts = await this.getAllNfts();
    const total = allNfts.length;
    const available = allNfts.filter(nft => nft.status === 'available').length;
    const minted = allNfts.filter(nft => nft.status === 'minted').length;
    
    // Calculate total volume of minted NFTs
    const totalVolume = allNfts
      .filter(nft => nft.status === 'minted')
      .reduce((sum, nft) => sum + parseFloat(nft.price), 0)
      .toFixed(2);
    
    return {
      total,
      available,
      minted,
      totalVolume,
    };
  }
}

export const storage = new DatabaseStorage();
