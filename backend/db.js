// backend/db.js
const Database = require("better-sqlite3");
const db = new Database("shopping.db");

// Cria a tabela se ela não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit TEXT NOT NULL,
    category TEXT NOT NULL,
    completed INTEGER NOT NULL
  )
`);

module.exports = db;
