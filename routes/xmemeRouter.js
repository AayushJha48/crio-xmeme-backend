const express = require("express");
const router = express.Router();
const {
  createMeme,
  getMemes,
  getMemeById,
  updateMeme
} = require("../controllers/xmemeController");

// This route is hit to create a meme and store in the database
router.post("/memes", createMeme);

// This route is hit to get 100 memes
router.get("/memes", getMemes);

// This route is hit to get a specific meme
router.get("/memes/:id", getMemeById);

// This route is hit to update a specific meme
router.patch("/memes/:id", updateMeme);

module.exports = router;
