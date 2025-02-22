import type { Express } from "express";
import { createServer } from "http";

export async function registerRoutes(app: Express) {
  // Proxy route for Nominatim API
  app.get("/api/locations/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
        {
          headers: {
            'User-Agent': 'EcoRoute-App/1.0',
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Nominatim API responded with ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Nominatim API error:', error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}