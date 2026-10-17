const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { accessSecret } = require("../config");

const sendError = (res, status, message) =>
  res.status(status).json({ message });
async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return sendError(res, 401, "Authentication required");
    req.auth = jwt.verify(token, accessSecret);
    req.user = await User.findById(req.auth.sub);
    if (!req.user) return sendError(res, 401, "User account no longer exists");
    next();
  } catch (_) {
    return sendError(res, 401, "Invalid or expired access token");
  }
}

module.exports = { requireAuth, sendError };
