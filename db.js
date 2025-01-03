const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./warnings.db');

// Création de la table des avertissements si elle n'existe pas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS warnings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    moderatorId TEXT NOT NULL,
    reason TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
