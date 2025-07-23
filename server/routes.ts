import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all NFTs
  app.get("/api/nfts", async (req, res) => {
    try {
      const nfts = await storage.getAllNfts();
      res.json(nfts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch NFTs" });
    }
  });

  // Get NFT by ID
  app.get("/api/nfts/:id", async (req, res) => {
    try {
      const nft = await storage.getNft(parseInt(req.params.id));
      if (!nft) {
        return res.status(404).json({ error: "NFT not found" });
      }
      res.json(nft);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch NFT" });
    }
  });

  // Update NFT status (for minting)
  app.patch("/api/nfts/:id/status", async (req, res) => {
    try {
      const { status, owner } = req.body;
      const nft = await storage.updateNftStatus(parseInt(req.params.id), status, owner);
      if (!nft) {
        return res.status(404).json({ error: "NFT not found" });
      }
      res.json(nft);
    } catch (error) {
      res.status(500).json({ error: "Failed to update NFT status" });
    }
  });

  // Get collection stats
  app.get("/api/collection/stats", async (req, res) => {
    try {
      const stats = await storage.getCollectionStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch collection stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
