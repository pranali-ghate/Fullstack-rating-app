const db = require('../models/db');

exports.getStats = (req, res) => {
  db.query("SELECT COUNT(*) as userCount FROM users WHERE role = 'user'", (err, users) => {
    db.query("SELECT COUNT(*) as storeCount FROM stores", (err2, stores) => {
      if (err || err2) return res.status(500).send(err || err2);
      res.send({ users: users[0].userCount, stores: stores[0].storeCount });
    });
  });
};

exports.getAllUsers = (req, res) => {
  db.query("SELECT id, name, email, role, status FROM users WHERE role = 'user'", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

exports.toggleUserStatus = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE users SET status = IF(status = 'active', 'inactive', 'active') WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "User status toggled" });
  });
};
