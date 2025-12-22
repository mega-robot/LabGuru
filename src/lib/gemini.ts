const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function analyzeCCode(code: string) {
  const prompt = `
You are a strict C programming lab evaluator.

Analyze the following C code.

Tasks:
1. Identify ALL errors (syntax, logical, conceptual).
2. Return each error as a HINT (do NOT reveal full solution).
3. Assign severity: high | medium | low.
4. Mention line numbers if applicable.
5. Provide a fully corrected version of the code separately.

Return ONLY valid JSON in this format:

{
  "errors": [
    {
      "message": "hint text",
      "severity": "high",
      "line": 7
    }
  ],
  "corrected_code": "full corrected C code"
}

Code:
\`\`\`c
${code}
\`\`\`
`;

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("Gemini returned no response");

  return JSON.parse(text);
}
