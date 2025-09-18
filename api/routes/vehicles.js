// routes/vehicles.js
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// GET all vehicles
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET a single vehicle by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM vehicles WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Vehicle not found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new vehicle
router.post('/', async (req, res) => {
  try {
    const { brand, model, year, price_per_day, available } = req.body;

    const result = await pool.query(
      'INSERT INTO vehicles (brand, model, year, price_per_day, available) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [brand, model, year, price_per_day, available]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT update vehicle by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, model, year, price_per_day, available } = req.body;

    const result = await pool.query(
      'UPDATE vehicles SET brand=$1, model=$2, year=$3, price_per_day=$4, available=$5 WHERE id=$6 RETURNING *',
      [brand, model, year, price_per_day, available, id]
    );

    if (result.rows.length === 0) return res.status(404).send('Vehicle not found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE a vehicle by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM vehicles WHERE id=$1 RETURNING *', [id]);

    if (result.rows.length === 0) return res.status(404).send('Vehicle not found');
    res.json({ message: 'Vehicle deleted', vehicle: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
