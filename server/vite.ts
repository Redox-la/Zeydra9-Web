import { createServer } from "vite";
import express from "express";

export async function setupVite(app: express.Application, apiServer: express.Application) {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
  return vite; // Ensure this returns the server
}

export function serveStatic(app: express.Application) {
  // Static file serving logic if needed
  app.use(express.static("public")); // Example, adjust path
}

export function log(message: string) {
  console.log(message);
}