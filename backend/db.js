// // backend/db.js
// import Database from "better-sqlite3";
// const db = new Database("shopping.db");

// // Cria a tabela se ela não existir
// db.exec(`
//   CREATE TABLE IF NOT EXISTS items (
//     id TEXT PRIMARY KEY,
//     name TEXT NOT NULL,
//     quantity INTEGER NOT NULL,
//     unit TEXT NOT NULL,
//     category TEXT NOT NULL,
//     completed INTEGER NOT NULL
//   )
// `);

// export default db;
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default pool;
