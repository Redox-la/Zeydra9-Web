// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { ethers } from "ethers";

dotenv.config();

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ----- Logger for /api calls -----
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: any;

  const originalJson = res.json;
  (res as any).json = function (bodyJson: any, ...args: any[]) {
    capturedJsonResponse = bodyJson;
    return originalJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const ms = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let line = `${req.method} ${reqPath} ${res.statusCode} in ${ms}ms`;
      if (capturedJsonResponse) line += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (line.length > 160) line = line.slice(0, 159) + "…";
      console.log(line);
      try {
        log(line);
      } catch {}
    }
  });

  next();
});

// ----- Health check -----
app.get("/health", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

app.get("/", (_req, res) => {
  res.send("✅ zkEngage / Zeydra9 fullstack server — visit /api or build the frontend");
});

// ----- Mock /api/nfts route -----
app.get("/api/nfts", (_req, res) => {
  const mockNFTs = [
    { id: 1, name: "Zeydra9 #001", image: "https://example.com/nft001.png", description: "First Zeydra9 NFT", owner: "0x123...abc" },
    { id: 2, name: "Zeydra9 #002", image: "https://example.com/nft002.png", description: "Second Zeydra9 NFT", owner: "0x456...def" },
    { id: 3, name: "Zeydra9 #003", image: "https://example.com/nft003.png", description: "Third Zeydra9 NFT", owner: "0x789...ghi" },
  ];

  res.json({ success: true, data: mockNFTs });
});

// ----- Mock zkEngage proof verification -----
app.post("/api/verify-proof", (req: Request, res: Response) => {
  const { proof, userAddress } = req.body;
  if (!proof || !userAddress) return res.status(400).json({ success: false, message: "Missing proof or userAddress" });

  // Mock verification logic
  const isValid = proof === "VALID_PROOF"; // replace with real zk verification
  res.json({ success: isValid, verifiedAddress: isValid ? userAddress : null });
});

// ----- Register other API routes -----
(async () => {
  const apiServer = express();
  await registerRoutes(apiServer);
  app.use("/api", apiServer);

  // ----- Dev mode: Vite middleware -----
  if (process.env.NODE_ENV === "development") {
    try {
      const viteServer = await setupVite(app, apiServer);
      if (viteServer && (viteServer as any).middlewares) {
        app.use((viteServer as any).middlewares);
        console.log("⚡ Vite middleware attached (dev mode)");
      }
    } catch (err) {
      console.error("Failed to setup Vite (dev):", err);
    }
  } else {
    // ----- Production: serve /dist -----
    const distPath = path.join(__dirname, "../dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // ----- Global error handler -----
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err);
    const status = err?.status || err?.statusCode || 500;
    res.status(status).json({ message: err?.message || "Internal Server Error" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    log?.(`🚀 Fullstack server listening on http://localhost:${PORT} (NODE_ENV=${process.env.NODE_ENV || "undefined"})`);
    console.log(`🚀 Fullstack server listening on http://localhost:${PORT}`);
  });
})();