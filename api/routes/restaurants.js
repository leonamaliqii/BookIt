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

export default router;
