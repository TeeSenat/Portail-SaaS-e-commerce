const db = require("../config/db");

// Ajouter produit
exports.createProduct = (req, res) => {
  const { tenant_id, name, price, stock } = req.body;

  const sql = `
    INSERT INTO products (tenant_id, name, price, stock)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [tenant_id, name, price, stock], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Produit ajouté" });
  });
};

// Lister produits par boutique
exports.getProductsByTenant = (req, res) => {
  const tenantId = req.params.tenant_id;

  const sql = "SELECT * FROM products WHERE tenant_id = ?";
  db.query(sql, [tenantId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Supprimer produit
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Produit supprimé" });
  });
};
