import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY missing in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ===================== ANALYZE CODE ===================== */

app.post("/api/analyze", async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert ${language || "C"} programming lab assistant.

Analyze the following C code and return ONLY valid JSON in this exact format:

{
  "errors": [
    {
      "message": "string",
      "severity": "high | medium | low",
      "line": number
    }
  ],
  "corrected_code": "string"
}

Rules:
- Focus on logical, runtime, and syntax errors
- corrected_code must be FULL corrected C code
- Do NOT add explanations
- Do NOT use markdown
- Output ONLY JSON

CODE:
${code}
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    // 🔐 Safe JSON extraction
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid JSON from Gemini");
    }

    const parsed = JSON.parse(jsonMatch[0]);
    res.json(parsed);

  } catch (err) {
    console.error("❌ Analyze error:", err.message);
    res.status(500).json({ error: "Gemini analysis failed" });
  }
});

/* ===================== CHAT ===================== */

app.post("/api/chat", async (req, res) => {
  try {
    const { code, question, language } = req.body;

    if (!question) {
      return res.status(400).json({ error: "No question provided" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a ${language || "C"} programming teaching assistant.

User code:
${code || "(no code provided)"}

User question:
${question}

Rules:
- Be concise
- Explain logically
- Do NOT hallucinate output
- Do NOT use markdown
`;

    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });

  } catch (err) {
    console.error("❌ Chat error:", err.message);
    res.status(500).json({ error: "Chat failed" });
  }
});

/**
 * HARDWARE LAB CHATBOT
 */
app.post("/api/hardware-chat", async (req, res) => {
  try {
    const { experiment, question } = req.body;

    if (!experiment || !question) {
      return res.status(400).json({ error: "Missing experiment or question" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a Digital Electronics Lab Instructor.

Experiment details:
Title: ${experiment.title}
Aim: ${experiment.aim}
Required ICs: ${experiment.requiredICs?.join(", ") || "N/A"}
Truth Table:
${experiment.truthTable
  ?.map((r) => `${r.inputs} → ${r.outputs}`)
  .join("\n") || "N/A"}

Student Question:
${question}

Rules:
- Answer like a lab instructor
- Be clear and concise
- Do NOT hallucinate ICs or theory
- If question is outside scope, say so politely
- No markdown
`;

    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });

  } catch (err) {
    console.error("Hardware chat error:", err);
    res.status(500).json({ error: "Hardware chatbot failed" });
  }
});


/* ===================== START ===================== */

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});
