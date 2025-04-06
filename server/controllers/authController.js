const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  db.query("INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, 'user', 'active')",
    [name, email, hashed],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "User registered" });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).send({ message: "Invalid credentials" });

    const user = results[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).send({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.send({ token, role: user.role });
  });
};
