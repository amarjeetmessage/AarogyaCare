const { loadEnvFile } = require("node:process");
const mongoose = require("mongoose");

try { loadEnvFile(); } catch (_) {}

const config = {
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/aarogya-care",
  accessSecret: process.env.JWT_ACCESS_SECRET || "development-access-secret-change-me",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "development-refresh-secret-change-me",
  isProduction: process.env.NODE_ENV === "production",
};

async function connectDatabase() { await mongoose.connect(config.mongoUri); }

module.exports = { ...config, connectDatabase };
