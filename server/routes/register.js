const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db"); // your MySQL connection
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into database
    const insertQuery = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    db.query(insertQuery, [username, hashedPassword, role], (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err });
      res.status(201).json({ message: "User registered successfully!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Error hashing password", error: err });
  }
});

module.exports = router;
