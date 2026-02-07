const db = require("../config/db");

// Ajouter au panier
exports.addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [user_id, product_id, quantity], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Produit ajouté au panier" });
  });
};

// Voir panier utilisateur
exports.getCart = (req, res) => {
  const userId = req.params.user_id;

  const sql = `
    SELECT cart.id, products.name, products.price, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Supprimer du panier
exports.removeFromCart = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM cart WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Produit retiré du panier" });
  });
};
