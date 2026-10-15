const { askGemini } = require("../services/geminiService");
const { sendError } = require("../middleware/auth");

async function chat(req, res) {
  try {
    const { message, history = [] } = req.body;
    if (typeof message !== "string" || !message.trim()) return sendError(res, 400, "Message is required");
    if (message.length > 4000) return sendError(res, 400, "Message must be 4,000 characters or fewer");
    const safeHistory = Array.isArray(history) ? history.slice(-20).filter((item) => ["user", "model"].includes(item?.role) && typeof item?.text === "string" && item.text.length <= 4000).map((item) => ({ role: item.role, text: item.text })) : [];
    const reply = await askGemini([...safeHistory, { role: "user", text: message.trim() }]);
    res.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error.message);
    if (error.message === "Gemini API key is not configured") return sendError(res, 503, "The health assistant is not configured yet");
    sendError(res, 502, "The health assistant is temporarily unavailable");
  }
}

module.exports = { chat };
