const db = require("../config/db");

// Paiement simulé
exports.checkout = (req, res) => {
  const { user_id, tenant_id, total, payment_method } = req.body;

  const sql = `
    INSERT INTO orders (user_id, tenant_id, total, payment_method, status)
    VALUES (?, ?, ?, ?, 'PAID')
  `;

  db.query(sql, [user_id, tenant_id, total, payment_method], (err) => {
    if (err) return res.status(500).json(err);

    // vider panier après paiement
    db.query("DELETE FROM cart WHERE user_id = ?", [user_id]);

    res.json({ message: "Paiement effectué avec succès" });
  });
};
