// routes/restaurants.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET /api/restaurants?city=Prishtine
router.get("/", async (req, res) => {
  const city = req.query.city;
  try {
    const query = city
      ? "SELECT * FROM restaurants WHERE city = $1"
      : "SELECT * FROM restaurants";
    const values = city ? [city] : [];
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/restaurants/find/:id
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM restaurants WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/restaurants
router.post("/", async (req, res) => {
  const { name, city, address, cuisine, description, photos } = req.body;

  // Basic validation
  if (!name || !city || !address) {
    return res.status(400).json({ message: "Name, city, and address are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO restaurants (name, city, address, cuisine, description, photos)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, city, address, cuisine, description, JSON.stringify(photos)]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/restaurants/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM restaurants WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// UPDATE restaurant
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, city, address, cuisine, description, photos } = req.body;

  try {
    const result = await pool.query(
      `UPDATE restaurants
       SET name = $1, city = $2, address = $3, cuisine = $4, description = $5, photos = $6
       WHERE id = $7
       RETURNING *`,
      [name, city, address, cuisine, description, JSON.stringify(photos), id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
