const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { refreshSecret, isProduction } = require("../config");
const { sendError } = require("../middleware/auth");
const {
  publicUser,
  signAccess,
  signRefresh,
  hashToken,
  createToken,
  setRefreshCookie,
  clearRefreshCookie,
} = require("../utils/auth");

async function register(req, res) {
  try {
    const { firstName, lastName, email, password, role = "Patient" } = req.body;
    const normalizedFirstName = String(firstName || "").trim();
    const normalizedLastName = String(lastName || "").trim();
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    if (
      !normalizedFirstName ||
      !normalizedLastName ||
      !normalizedEmail ||
      !password
    )
      return sendError(res, 400, "All fields are required");
    if (password.length < 12)
      return sendError(res, 400, "Password must be at least 12 characters");
    if (!["Patient", "Doctor"].includes(role))
      return sendError(res, 400, "Invalid role");
    if (await User.exists({ email: normalizedEmail }))
      return sendError(res, 409, "An account with this email already exists");
    const user = await User.create({
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(password, 12),
      role,
    });
    setRefreshCookie(res, signRefresh(user));
    res.status(201).json({
      user: publicUser(user),
      accessToken: signAccess(user),
      message: "Account created successfully",
    });
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Unable to create account");
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({
      email: String(req.body.email || "")
        .trim()
        .toLowerCase(),
    }).select("+passwordHash");
    if (
      !user ||
      !(await bcrypt.compare(req.body.password || "", user.passwordHash))
    )
      return sendError(res, 401, "Invalid email or password");
    setRefreshCookie(res, signRefresh(user));
    res.json({ user: publicUser(user), accessToken: signAccess(user) });
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Unable to sign in");
  }
}

async function refresh(req, res) {
  try {
    const payload = jwt.verify(req.cookies.refreshToken || "", refreshSecret);
    const user = await User.findById(payload.sub);
    if (!user || user.refreshTokenVersion !== payload.version)
      return sendError(res, 401, "Session expired");
    setRefreshCookie(res, signRefresh(user));
    res.json({ user: publicUser(user), accessToken: signAccess(user) });
  } catch (_) {
    sendError(res, 401, "Session expired");
  }
}

async function logout(req, res) {
  try {
    const payload = jwt.decode(req.cookies.refreshToken || "");
    if (payload?.sub)
      await User.findByIdAndUpdate(payload.sub, {
        $inc: { refreshTokenVersion: 1 },
      });
  } finally {
    clearRefreshCookie(res);
    res.json({ message: "Signed out" });
  }
}

async function forgotPassword(req, res) {
  const user = await User.findOne({
    email: String(req.body.email || "")
      .trim()
      .toLowerCase(),
  });
  const response = {
    message: "If an account exists, a reset link has been generated",
  };
  if (!user) return res.json(response);
  const token = createToken();
  user.resetTokenHash = hashToken(token);
  user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();
  if (!isProduction) response.resetToken = token;
  res.json(response);
}

async function resetPassword(req, res) {
  const { token, password } = req.body;
  if (!token || !password || password.length < 12)
    return sendError(
      res,
      400,
      "A valid token and 12-character password are required",
    );
  const user = await User.findOne({
    resetTokenHash: hashToken(token),
    resetTokenExpires: { $gt: new Date() },
  }).select("+passwordHash");
  if (!user) return sendError(res, 400, "Reset token is invalid or expired");
  user.passwordHash = await bcrypt.hash(password, 12);
  user.resetTokenHash = undefined;
  user.resetTokenExpires = undefined;
  user.refreshTokenVersion += 1;
  await user.save();
  res.json({ message: "Password reset successfully" });
}

async function updateProfile(req, res) {
  const firstName = String(req.body.firstName || "").trim();
  const lastName = String(req.body.lastName || "").trim();
  if (firstName.length < 2 || firstName.length > 50)
    return sendError(
      res,
      400,
      "First name must be between 2 and 50 characters",
    );
  if (lastName.length < 2 || lastName.length > 50)
    return sendError(res, 400, "Last name must be between 2 and 50 characters");

  req.user.firstName = firstName;
  req.user.lastName = lastName;
  await req.user.save();
  res.json({
    user: publicUser(req.user),
    message: "Profile updated successfully",
  });
}

async function changePassword(req, res) {
  const currentPassword = String(req.body.currentPassword || "");
  const newPassword = String(req.body.newPassword || "");
  if (!currentPassword || newPassword.length < 12)
    return sendError(
      res,
      400,
      "Current password and a 12-character new password are required",
    );

  const user = await User.findById(req.user._id).select("+passwordHash");
  if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash)))
    return sendError(res, 401, "Current password is incorrect");

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  user.refreshTokenVersion += 1;
  await user.save();
  clearRefreshCookie(res);
  res.json({ message: "Password changed successfully. Please sign in again." });
}

module.exports = {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
  changePassword,
};
