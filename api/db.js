// db.js
import pkg from 'pg';
const { Pool } = pkg;

// Create PostgreSQL connection pool
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'car_rental',
  password: 'postgres',
  port: 5432,
});


async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL:', res.rows[0]);
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testConnection();
