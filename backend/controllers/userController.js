const db = require("../config/db");

exports.createUser = (req, res) => {
  const { tenant_id, name, email, password, role } = req.body;

  const sql = `
    INSERT INTO users (tenant_id, name, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [tenant_id, name, email, password, role], (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ message: "Utilisateur créé" });
  });
};
