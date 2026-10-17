const express = require("express");
const {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
  changePassword,
} = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");
const { publicUser } = require("../utils/auth");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, (req, res) =>
  res.json({ user: publicUser(req.user) }),
);
router.patch("/me", requireAuth, updateProfile);
router.post("/change-password", requireAuth, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
module.exports = router;
