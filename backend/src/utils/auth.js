const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const { accessSecret, refreshSecret, isProduction } = require("../config");

const publicUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  emailVerified: user.emailVerified,
});
const signAccess = (user) =>
  jwt.sign({ sub: user._id.toString(), role: user.role }, accessSecret, {
    expiresIn: "15m",
  });
const signRefresh = (user) =>
  jwt.sign(
    { sub: user._id.toString(), version: user.refreshTokenVersion },
    refreshSecret,
    { expiresIn: "7d" },
  );
const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");
const createToken = () => crypto.randomBytes(32).toString("hex");
const setRefreshCookie = (res, token) =>
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth",
  });
const clearRefreshCookie = (res) =>
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/api/auth",
  });

module.exports = {
  publicUser,
  signAccess,
  signRefresh,
  hashToken,
  createToken,
  setRefreshCookie,
  clearRefreshCookie,
};
