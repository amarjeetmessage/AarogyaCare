const express = require("express");
const { chat } = require("../controllers/chatController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
router.post("/", requireAuth, chat);
module.exports = router;
