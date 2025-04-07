import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "./db.js"; // Importa o banco SQLite

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         quantity:
 *           type: number
 *         unit:
 *           type: string
 *         category:
 *           type: string
 *         completed:
 *           type: boolean
 */

/**
 * @swagger
 * /api/shopping-list:
 *   get:
 *     summary: Retorna todos os itens da lista de compras
 *     responses:
 *       200:
 *         description: Lista de itens
 */
router.get("/", (req, res) => {
  const items = db.prepare("SELECT * FROM items").all();
  res.json(items.map((i) => ({ ...i, completed: Boolean(i.completed) })));
});

/**
 * @swagger
 * /api/shopping-list:
 *   post:
 *     summary: Adiciona um novo item à lista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item criado
 */
router.post("/", (req, res) => {
  const { name, quantity, unit, category } = req.body;
  const id = uuidv4();
  db.prepare(
    `
    INSERT INTO items (id, name, quantity, unit, category, completed)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  ).run(id, name, quantity, unit, category, 0);

  res
    .status(201)
    .json({ id, name, quantity, unit, category, completed: false });
});

/**
 * @swagger
 * /api/shopping-list/{id}:
 *   put:
 *     summary: Atualiza um item da lista
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item atualizado
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, quantity, unit, category, completed } = req.body;

  db.prepare(
    `
    UPDATE items SET name = ?, quantity = ?, unit = ?, category = ?, completed = ?
    WHERE id = ?
  `
  ).run(name, quantity, unit, category, completed ? 1 : 0, id);

  res.json({ message: "Item atualizado" });
});

/**
 * @swagger
 * /api/shopping-list/{id}:
 *   delete:
 *     summary: Remove um item da lista
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item removido
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM items WHERE id = ?").run(id);
  res.status(204).send();
});

export default router;
