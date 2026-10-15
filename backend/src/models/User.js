const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
  lastName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["Patient", "Doctor"], default: "Patient" },
  emailVerified: { type: Boolean, default: false },
  resetTokenHash: String,
  resetTokenExpires: Date,
  refreshTokenVersion: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
