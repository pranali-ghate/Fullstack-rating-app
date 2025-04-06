const db = require('../models/db');

exports.getMyStore = (req, res) => {
  const { id } = req.user;
  db.query("SELECT * FROM stores WHERE owner_id = ?", [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results[0]);
  });
};

exports.updateStore = (req, res) => {
  const { id } = req.user;
  const { name, description } = req.body;
  db.query("UPDATE stores SET name = ?, description = ? WHERE owner_id = ?", [name, description, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Store updated" });
  });
};
