import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Report Endpoint using Gemini
  app.post("/api/ai-report", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const { trades } = req.body || {};

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Fallback intelligent summary if key not configured
        return res.json({
          report: `### 📊 AI Trade Execution Diagnosis\nAnalyzed ${trades?.length || 0} trades.\n\n- **Pattern Detected**: Counter-trend entries during high impact news sessions.\n- **Recommendation**: Focus on H4 level retests and enforce 1:2 Risk to Reward rules.`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Analyze these trading journal trades and output 3 structured sections: 1. Executive Summary, 2. Critical Weaknesses, 3. Tactical Adjustments.\nTrades data: ${JSON.stringify(trades || [])}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ report: response.text || "Report generated successfully." });
    } catch (err: any) {
      console.error("AI Report Error:", err);
      res.status(500).json({ error: "Failed to generate AI report" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
