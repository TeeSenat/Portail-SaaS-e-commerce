const db = require("../config/db");

exports.createTenant = (req, res) => {
  const { name } = req.body;

  const sql = "INSERT INTO tenants (name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ message: "Boutique créée", tenantId: result.insertId });
  });
};
