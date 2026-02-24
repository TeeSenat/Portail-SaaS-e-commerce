const db = require("../config/db");

exports.createUser = async (req, res) => {
  try {
    const { tenant_id, name, email, password, role } = req.body;

    const sql = `
      INSERT INTO users (tenant_id, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(sql, [tenant_id, name, email, password, role]);

    res.json({ message: "Utilisateur créé" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    res.json({
      message: "Connexion réussie",
      user: rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    res.json({
      message: "Compte créé avec succès",
      user: { id: result.insertId, name, email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


