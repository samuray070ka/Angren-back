const express = require("express");
const router = express.Router();
const Home = require("../models/homeSchema");

// Ma'lumotlarni olish
router.get("/", async (req, res) => {
  try {
    const homeData = await Home.findOne();
    res.json(homeData);
  } catch (error) {
    res.status(500).json({ error: "Server xatosi", details: error.message });
  }
});

// Ma'lumotni o‘chirish

module.exports = router;