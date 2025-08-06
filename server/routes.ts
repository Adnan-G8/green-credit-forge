import type { Express } from "express";
import { createServer, type Server } from "http";
import adminRoutes from "./routes/admin";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Register admin routes
  app.use("/api/admin", adminRoutes);
  
  // Placeholder API routes - will be replaced with Supabase integration
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "API is running" });
  });

  const httpServer = createServer(app);
  return httpServer;
}