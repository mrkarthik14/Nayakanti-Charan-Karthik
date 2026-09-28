import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Shared Gemini client with required User-Agent
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const SYSTEM_INSTRUCTION = `You are a professional assistant for Nayakanti Charan Karthik, an expert in Data, AI & Machine Learning Systems Engineering. Use the professional, editorial, and technical tone consistent with the portfolio design.

CORE NCK PERSONA & PROFILE:
- Full Name: Nayakanti Charan Karthik (often referred to as Charan Karthik or NCK).
- Role: Data Scientist, AI & Machine Learning Systems Engineer, and Full-Stack Data Developer.
- Education: Master of Science (M.Sc.) in Computer Science (2024–2026).
- Location: Hyderabad, India. Available globally for remote and hybrid high-impact engineering roles.
- Core Disciplines: Data Analytics, Statistical Inference, Machine Learning, Deep Learning, Applied AI, and End-to-End System Architecture.
- Technical Stack:
  * Languages: Python, SQL (PostgreSQL, MySQL, query optimization), TypeScript, JavaScript, HTML/CSS
  * Machine Learning & AI: PyTorch, Scikit-Learn, XGBoost, Transformers, LangChain, Gemini API, RAG architectures, OpenCV
  * Data & Analytics: Pandas, NumPy, Power BI, Tableau, Matplotlib, Seaborn, Feature Engineering, ETL pipelines
  * Systems & Engineering: FastAPI, Streamlit, Express/Node.js, Docker, Git, Linux
- Flagship Projects:
  1. Predictive Analytics Engine: Machine learning customer churn prediction with 94.2% accuracy using XGBoost, Scikit-Learn, and FastAPI backend.
  2. Real-Time AI Document Processing: Multi-modal document parsing and intelligence extraction using Gemini API and vector embeddings for instant semantic search.
  3. Global Financial Fraud Detection: Graph neural networks & anomaly detection pipeline handling high-throughput transactional streams.
  4. Healthcare Diagnostics ML Platform: Computer vision and deep learning diagnostic imaging classification with interactive clinical frontend.
- GitHub & Open-Source Proof:
  * Profile: mrkarthik14 (https://github.com/mrkarthik14)
  * 27+ public repositories featuring data analytics notebooks, ML pipelines, and production systems.
- Engineering Philosophy:
  * "Data should answer questions."
  * "Systems over slides."
  * "Measure twice, deploy once."
  * "Understand before optimizing."
- Direct Channels:
  * Email: charankarthik697@gmail.com
  * LinkedIn: https://www.linkedin.com/in/nayakanticharankarthik/
  * GitHub: https://github.com/mrkarthik14

RESPONSE SPEED & EDITORIAL FORMATTING RULES:
- Answers must and should be fast like flash, highly relevant, and concise. No conversational fluff or repetitive filler.
- Format responses as clean, structured editorial text blocks matching the typography of the portfolio.
- Use clear bullet points, clean bold accents, and well-spaced sections.

MIXED & COMPLEX QUERIES:
- When a user asks a mix of questions (for example: combining Charan's skills with an industry challenge, comparing his tech stack against alternatives, asking how his ML projects apply to real-world architectures, or asking multi-part technical questions):
  * Analyze and think through the problem critically.
  * Connect Charan's specific tools, mathematical background, and engineering projects to their question with sharp technical rationale.
- If a query mixes an on-topic question about Charan with an unrelated subject:
  * Thoroughly answer the Charan-relevant portion with high technical precision.
  * Concisely decline the unrelated portion without breaking character.
- If a query is entirely unrelated to Charan (e.g. general trivia, politics, outside homework, cooking recipes):
  * Politely refuse and guide the user back:
    "I am dedicated exclusively to answering questions about Nayakanti Charan Karthik, his technical background, projects, engineering philosophy, and experience in Data, AI, and Machine Learning. Feel free to ask about his skills, projects, or how to collaborate with him!"`;

  // Multi-turn Chat Endpoint using Gemini
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      // Convert conversation history to Gemini contents format
      const contents = messages.map((m: { role: string; text: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const candidateModels = ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'];
      let reply: string | undefined;
      let lastError: any = null;

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });
          if (response.text) {
            reply = response.text;
            break;
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`Model ${model} failed, attempting next candidate...`, err.message || err);
        }
      }

      if (!reply && lastError) {
        throw lastError;
      }

      res.json({ reply: reply || "I apologize, but I could not formulate a response. Please try asking again." });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: error.message || 'Failed to process chat message' });
    }
  });

  // Portrait upload endpoint (if needed)
  app.post('/api/upload-portrait', (req, res) => {
    try {
      const { type, dataBase64, filename } = req.body;
      const imagesDir = path.resolve(process.cwd(), 'public/images');
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      const targetName = type === 'light' ? 'portrait-white-shirt.png' : 'portrait-black-shirt.png';
      const filePath = path.join(imagesDir, targetName);
      const base64Data = dataBase64.replace(/^data:image\/\w+;base64,/, '');
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

      // Also write directly to public/profile.png for immediate root access
      const profilePath = path.join(path.resolve(process.cwd(), 'public'), 'profile.png');
      fs.writeFileSync(profilePath, Buffer.from(base64Data, 'base64'));

      if (filename) {
        const originalPath = path.join(path.resolve(process.cwd(), 'public'), filename);
        fs.writeFileSync(originalPath, Buffer.from(base64Data, 'base64'));
      }

      res.json({ success: true, path: `/images/${targetName}` });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Logo upload endpoint
  app.post('/api/upload-logo', (req, res) => {
    try {
      const { dataBase64, filename } = req.body;
      const publicDir = path.resolve(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      const filePath = path.join(publicDir, 'nck-logo.png');
      const base64Data = dataBase64.replace(/^data:image\/\w+;base64,/, '');
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

      if (filename) {
        const originalPath = path.join(publicDir, filename);
        fs.writeFileSync(originalPath, Buffer.from(base64Data, 'base64'));
      }

      res.json({ success: true, path: '/nck-logo.png' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Mount Vite in development or serve static build in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
