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
    const { company_id, brand, model, year, price_per_day, photo } = req.body;

    // Basic validation
    if (!company_id || !brand || !model || !price_per_day) {
      return res.status(400).json({ message: "Company, brand, model, and price are required" });
    }

    const result = await pool.query(
      `INSERT INTO vehicles (company_id, brand, model, year, price_per_day, photo)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [company_id, brand, model, year || null, price_per_day, photo || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/vehicles error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update vehicle by id

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { company_id, brand, model, year, price_per_day, photo } = req.body;

    const result = await pool.query(
      'UPDATE vehicles SET company_id=$1, brand=$2, model=$3, year=$4, price_per_day=$5, photo=$6 WHERE id=$7 RETURNING *',
      [company_id, brand, model, year, price_per_day, photo, id]
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
