import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// GET all rentals
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rentals');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET rental by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM rentals WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Rental not found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new rental
router.post('/', async (req, res) => {
  try {
    const { vehicle_id, user_name, start_date, end_date, total_price, status } = req.body;
    const result = await pool.query(
      'INSERT INTO rentals (vehicle_id, user_name, start_date, end_date, total_price, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [vehicle_id, user_name, start_date, end_date, total_price, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT rental by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicle_id, user_name, start_date, end_date, total_price, status } = req.body;
    const result = await pool.query(
      'UPDATE rentals SET vehicle_id=$1, user_name=$2, start_date=$3, end_date=$4, total_price=$5, status=$6 WHERE id=$7 RETURNING *',
      [vehicle_id, user_name, start_date, end_date, total_price, status, id]
    );
    if (result.rows.length === 0) return res.status(404).send('Rental not found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE rental by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM rentals WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send('Rental not found');
    res.json({ message: 'Rental deleted', rental: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
