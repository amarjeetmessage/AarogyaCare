const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const { clientUrl } = require("./config");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.get("/", (_req, res) =>
  res.json({ service: "AarogyaCare API", status: "ok" }),
);
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }),
  authRoutes,
);
app.use(
  "/api/chat",
  rateLimit({
    windowMs: 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }),
  chatRoutes,
);

module.exports = app;
