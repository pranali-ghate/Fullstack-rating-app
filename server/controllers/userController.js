const db = require('../models/db');

exports.getStores = (req, res) => {
  db.query("SELECT * FROM stores", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

exports.rateStore = (req, res) => {
  const { userId } = req.user;
  const { storeId, rating } = req.body;

  db.query("INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?",
    [userId, storeId, rating, rating],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Rating submitted" });
    });
};
