const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("./userAuth");

// Add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.body;
    const userId = req.user.id; // extracted from JWT in middleware

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.favourites.includes(bookid)) {
      return res.status(200).json({ message: "Book is already in favourites" });
    }

    await User.findByIdAndUpdate(userId, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove book from favourites
router.delete("/remove-book-from-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.favourites.includes(bookid)) {
      return res.status(400).json({ message: "Book not in favourites" });
    }

    await User.findByIdAndUpdate(userId, { $pull: { favourites: bookid } });
    return res.status(200).json({ message: "Book removed from favourites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
