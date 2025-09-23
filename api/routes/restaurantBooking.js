import express from "express";
import {pool} from "../db.js"; 

const router = express.Router();

router.post("/", async (req, res) => {
  const { restaurant_id, first_name, last_name, date, time, num_people } = req.body;

  if (!restaurant_id || !first_name || !last_name || !date || !time || !num_people) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO restaurant_reservations (restaurant_id, first_name, last_name, date, time, num_people) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [restaurant_id, first_name, last_name, date, time, num_people]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Reservation failed." });
  }
});

export default router; 
