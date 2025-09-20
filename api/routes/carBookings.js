// routes/carBookings.js
import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
      console.log("Received POST body:", req.body);
    const {
      itemId,
      itemType,
      userId,
      firstName,
      lastName,
      startDate,
      endDate,
      numDays,
      totalPrice,
      cardNumber,
    } = req.body;

    // Convert numeric fields
    const numDaysInt = Number(numDays);
    const totalPriceNum = Number(totalPrice);

    // Log what is being received
    console.log("Booking data received:", req.body);

        // Validate required fields
    if (!itemId || !itemType || !userId || !firstName || !lastName || !startDate || !endDate || !numDays || !totalPrice || !cardNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO car_bookings 
      (item_id, item_type, user_id, first_name, last_name, start_date, end_date, num_days, total_price, card_number) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) 
      RETURNING *`,
      [
        itemId,
        itemType,
        userId,
        firstName,
        lastName,
        startDate,
        endDate,
        numDaysInt,
        totalPriceNum,
        cardNumber,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Postgres error:", err);
    res.status(500).send("Server error");
  }
});

// Get all car bookings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM car_bookings');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
