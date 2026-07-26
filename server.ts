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
      aiClient = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
  }
  return aiClient;
}

// AI Compliance Assistant Route
app.post('/api/compliance-ai', async (req, res) => {
  try {
    const { prompt, businessProfile, obligations } = req.body;
    const ai = getGenAI();

    const businessName = businessProfile?.name || 'Your Business';
    const industry = businessProfile?.industry || 'General Business';
    const county = businessProfile?.county || 'Nairobi County';

    if (!ai) {
      // Intelligent fallback answer if API key is pending
      const fallbackResponses: Record<string, string> = {
        'vat': `For ${businessName} (${industry}), KRA VAT (16%) is filed on the iTax portal by the 20th of every month. Ensure you match input VAT claims against ETIMS compliant supplier invoices to legally lower your net payable tax.`,
        'sha': `Social Health Authority (SHA) requires 2.75% gross salary contribution per employee, remitted by the 9th of each month. SHA replaces NHIF in Kenya.`,
        'nssf': `NSSF pension contributions are split into Tier I (KSh 420 employee / KSh 420 employer) and Tier II under the NSSF Act 2013, payable by the 9th of every month.`,
        'deduct': `Legitimate tax savings for Kenyan businesses include: 1) ETIMS input VAT refunds, 2) Affordable Housing Levy 15% relief, 3) NSSF & Pension statutory deductions, 4) Capital allowances on business equipment, and 5) Approved professional training expenses.`,
        'deadline': `Your immediate upcoming deadline is VAT Monthly Return due in 2 days (KSh 45,200) and NSSF Remittance due in 5 days (KSh 21,600). Your Single Business Permit for ${county} expires in 14 days.`
      };

      const lowerPrompt = prompt.toLowerCase();
      let selectedText = `Hello John 👋 As your compliance advisor for ${businessName}, I can confirm your business is operating legally. Regarding "${prompt}": You can streamline all payments directly in ComplyKE with automatic e-Receipt archiving.`;

      for (const [key, text] of Object.entries(fallbackResponses)) {
        if (lowerPrompt.includes(key)) {
          selectedText = text;
          break;
        }
      }

      return res.json({
        text: selectedText,
        suggestions: [
          'What taxes apply to my industry?',
          'How can I legally reduce my VAT payable?',
          'When is my next deadline?',
          'Why did my compliance score change?'
        ]
      });
    }

    const systemInstruction = `
You are ComplyAI, the calm, intelligent, and authoritative AI Business Compliance Advisor for Kenyan business owners powering the ComplyKE platform.
You assist Kenyan entrepreneurs with regulatory obligations across KRA (iTax/eTIMS), SHA (Social Health Authority), NSSF, County Government Permits, BRS (Business Registration Service), KEBS, ODPC (Data Protection), and EPRA/NEMA.

Current User Profile:
- Business Name: ${businessName}
- Industry: ${industry}
- Location: ${county}
- KRA PIN: ${businessProfile?.kraPin || 'A019283746Z'}
- Active Obligations Context: ${JSON.stringify(obligations || [])}

Rules:
1. NEVER recommend tax evasion or illegal schemes. Only suggest legal deductions, reliefs (e.g. ETIMS input tax, Housing Levy relief, capital allowances), and early payment penalty avoidance according to Kenyan Tax & Licensing Acts.
2. If the user owns a specific industry (e.g., Restaurant), contextualize automatically with applicable regulations (e.g., Food Hygiene Certificate, Liquor License, Fire Inspection, County Business Permit, SHA, NSSF, KRA).
3. Keep responses concise, clear, reassuring, and structured with bullet points where helpful.
4. Keep tone professional, encouraging, and trustworthy.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    return res.json({
      text: response.text || `I have analyzed the compliance rules for ${businessName}. How else can I assist?`,
      suggestions: [
        'How do I claim input VAT on software?',
        'What are the penalties for late SHA payment?',
        'How do I renew my County Business Permit?'
      ]
    });
  } catch (error: any) {
    console.error('Error in /api/compliance-ai:', error);
    return res.status(500).json({
      text: `Regarding your query: Under Kenyan regulations for ${req.body?.businessProfile?.name || 'your business'}, all KRA VAT filings must be processed by the 20th and SHA/NSSF statutorys by the 9th. ComplyKE automatically tracks these deadlines for you.`,
      suggestions: ['When is my next deadline?', 'How to legally save on tax?']
    });
  }
});

// M-PESA Simulation Payment Route
app.post('/api/pay-obligation', (req, res) => {
  const { obligationId, phone, amount } = req.body;
  const reference = `KRA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  
  setTimeout(() => {
    res.json({
      success: true,
      reference,
      paidAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: `M-PESA transaction successful. Received KSh ${amount?.toLocaleString()} for obligation payment. Official e-Receipt ${reference} generated and archived in Documents Vault.`
    });
  }, 1000);
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'ComplyKE - AI Business Compliance Platform' });
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
    console.log(`ComplyKE app server running on http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
});
