router.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    const selectQuery = "SELECT * FROM users WHERE username = ?";
    db.query(selectQuery, [username], async (err, results) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err });
      if (results.length === 0) return res.status(404).json({ message: "User not found" });
  
      const user = results[0];
  
      // Compare entered password with hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials" });
  
      // Passwords match! Proceed with login
      res.status(200).json({ message: "Login successful", user });
    });
  });
  