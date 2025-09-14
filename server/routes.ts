import express from "express";

export function registerRoutes(app: express.Application) {
  app.get("/nfts", async (_req, res) => {
    try {
      console.log("Attempting to fetch NFTs...");
      const nfts = [{ id: 1, name: "Zeydra9 #1" }]; // Mock data
      console.log("NFTs fetched:", nfts);
      res.json(nfts);
    } catch (error) {
      console.error("NFT fetch error:", error);
      res.status(500).json({ error: "Failed to fetch NFTs" });
    }
  });
}