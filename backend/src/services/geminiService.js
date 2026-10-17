const { geminiApiKey, geminiModel, geminiFallbackModel } = require("../config");

const systemInstruction = `You are AarogyaCare Health Guide, an educational health assistant.\n\nGive clear, practical, evidence-informed general health education in simple language. You are not a doctor and must not diagnose, prescribe medication, recommend changing prescribed treatment, or replace an in-person clinician. Ask useful follow-up questions when context is missing. For possible emergencies such as chest pain, severe breathing difficulty, stroke symptoms, severe allergic reaction, heavy bleeding, loss of consciousness, or suicidal thoughts, tell the user to contact local emergency services immediately. Encourage a qualified healthcare professional for persistent, worsening, or concerning symptoms. Never request unnecessary highly sensitive personal data. Include a short safety note when advice could be misunderstood as diagnosis.`;

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const isTransient = (error) => [429, 500, 502, 503, 504].includes(error.status) || /high demand|temporarily unavailable|overloaded/i.test(error.message);

async function requestModel(model, messages) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": geminiApiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: messages.map(({ role, text }) => ({ role, parts: [{ text }] })),
      generationConfig: { temperature: 0.35, maxOutputTokens: 700 },
    }),
  });
  const data = await response.json();
  if (!response.ok) { const error = new Error(data.error?.message || "Gemini request failed"); error.status = response.status; throw error; }
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
  if (!text) throw new Error("Gemini returned an empty response");
  return text;
}

async function askGemini(messages) {
  if (!geminiApiKey || geminiApiKey === "replace-with-your-gemini-api-key") throw new Error("Gemini API key is not configured");
  const models = [...new Set([geminiModel, geminiFallbackModel])];
  let lastError;
  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try { return await requestModel(model, messages); }
      catch (error) { lastError = error; if (!isTransient(error) || attempt === 1) break; await sleep(500 * (attempt + 1)); }
    }
  }
  throw lastError || new Error("Gemini request failed");
}

module.exports = { askGemini };
