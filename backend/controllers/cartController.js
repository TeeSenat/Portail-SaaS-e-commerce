const db = require("../config/db");

exports.getCart = async (req, res) => {
  const [rows] = await db.query(`
    SELECT cart.*, products.name, products.price
    FROM cart
    JOIN products ON cart.product_id = products.id
  `);
  res.json(rows);
};

exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  await db.query(
    "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
    [product_id, quantity]
  );
  res.json({ message: "Produit ajouté au panier" });
};

exports.updateCart = async (req, res) => {
  const { product_id, change } = req.body;
  await db.query(
    "UPDATE cart SET quantity = quantity + ? WHERE product_id = ?",
    [change, product_id]
  );
  res.json({ message: "Quantité mise à jour" });
};

exports.removeFromCart = async (req, res) => {
  const { product_id } = req.body;
  await db.query(
    "DELETE FROM cart WHERE product_id = ?",
    [product_id]
  );
  res.json({ message: "Produit supprimé" });
};

exports.clearCart = async (req, res) => {
  await db.query("DELETE FROM cart");
  res.json({ message: "Panier vidé" });
};