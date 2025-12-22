const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function analyzeCCode(code: string) {
  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      language: "C",
    }),
  });

  if (!res.ok) {
    throw new Error("Backend analysis failed");
  }

  return res.json();
}
