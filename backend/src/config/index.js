const { loadEnvFile } = require("node:process");
const path = require("node:path");
const mongoose = require("mongoose");

try {
  loadEnvFile(path.resolve(__dirname, "../../.env"));
} catch (_) {}

const config = {
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/aarogya-care",
  accessSecret:
    process.env.JWT_ACCESS_SECRET || "development-access-secret-change-me",
  refreshSecret:
    process.env.JWT_REFRESH_SECRET || "development-refresh-secret-change-me",
  isProduction: process.env.NODE_ENV === "production",
  geminiApiKey: (process.env.GEMINI_API_KEY || "")
    .trim()
    .replace(/^['"]|['"]$/g, ""),
  geminiModel: process.env.GEMINI_MODEL || "gemini-3.8-flash",
  geminiFallbackModel:
    process.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash-lite",
};

async function connectDatabase() {
  await mongoose.connect(config.mongoUri);
}

module.exports = { ...config, connectDatabase };
