// routes/restaurants.js
import express from "express";
import {pool} from "../db.js"; 

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
//GET /api/restaurants/find/:id
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



export default router;
