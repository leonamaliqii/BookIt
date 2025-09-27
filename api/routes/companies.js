// routes/companies.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();


// POST /api/companies
router.post("/", async (req, res) => {
  const { name, city, description, logo, photo, phone, address } = req.body;

  // Basic validation
  if (!name || !city || !description) {
    return res.status(400).json({ message: "Name, city, and description are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO companies (name, city, description, logo, photo, phone, address)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, city, description, logo, photo, phone, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/companies error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Count companies by city
router.get("/countByCity", async (req, res) => {
  const { cities } = req.query; // expects "Prishtine,Gjakove,Peja"
  const cityList = cities.split(",");
  try {
    const counts = [];
    for (const city of cityList) {
      const result = await pool.query(
        "SELECT COUNT(*) FROM companies WHERE city ILIKE $1",
        [city]
      );
      counts.push(Number(result.rows[0].count));
    }
    res.json(counts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get companies (with vehicles) by city
router.get("/", async (req, res) => {
  const { city } = req.query;
  try {
    let query = `
      SELECT
        c.id,
        c.name,
        c.city,
        c.address,
        c.description,
        c.logo,
        c.photo,
        c.phone,
        COALESCE(
          json_agg(
            json_build_object(
              'id', v.id,
              'brand', v.brand,
              'model', v.model,
              'year', v.year,
              'price_per_day', v.price_per_day,
              'photo', v.photo
            )
          ) FILTER (WHERE v.id IS NOT NULL),
          '[]'
        ) AS vehicles
      FROM companies c
      LEFT JOIN vehicles v ON v.company_id = c.id
    `;
    const values = [];
    if (city) {
      query += ` WHERE c.city ILIKE $1`;
      values.push(`%${city}%`);
    }
    query += ` GROUP BY c.id ORDER BY c.name`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/companies error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single company by ID with its vehicles
router.get("/:id", async (req, res) => {
  const companyId = req.params.id;

  try {
    const companyResult = await pool.query(
      "SELECT * FROM companies WHERE id = $1",
      [companyId]
    );

    if (companyResult.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    const company = companyResult.rows[0];

    const vehiclesResult = await pool.query(
      "SELECT * FROM vehicles WHERE company_id = $1",
      [companyId]
    );

    company.vehicles = vehiclesResult.rows;

    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/companies/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM companies WHERE id = $1", [id]);
    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/companies error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
