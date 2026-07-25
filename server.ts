import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini lazily
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// AI Maya Insurance Assistant Route
app.post('/api/maya-chat', async (req, res) => {
  try {
    const { prompt, currentContext } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback friendly response if no API key is set yet
      return res.json({
        text: `I'm Maya, Lemonade's AI assistant! Regarding ${prompt.toLowerCase()}: Lemonade policies cover personal property against fire, theft, water damage, and personal liability anywhere in the world with $0 hassle payouts! Let me know if you need help adjusting your deductible or limits!`
      });
    }

    const systemInstruction = `
You are AI Maya, the friendly, empathetic, clear, and modern AI insurance guide for Lemonade Insurance.
Keep responses concise (2 to 4 sentences maximum), easy to understand, transparent, and conversational.
Lemonade offers Renters, Homeowners, Pet, Car, and Life insurance with fast payouts and a Giveback program.
Never use confusing insurance jargon without immediately explaining it in plain English.
Context about the user's policy quote: ${JSON.stringify(currentContext || {})}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text || "I'm here to help with your Lemonade quote!" });
  } catch (error: any) {
    console.error('Error in /api/maya-chat:', error);
    return res.status(500).json({
      text: "I'm Maya! Renters policies cover your electronics, clothes, and liability wherever you go. What questions can I answer for you?"
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Lemonade Onboarding Flow Clone' });
});

async function main() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lemonade app server running on http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
});
