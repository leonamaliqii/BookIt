import pkg from 'pg';
const { Pool } = pkg;

// Krijojmë lidhjen me PostgreSQL
const pool = new Pool({
  user: 'postgres',         
  host: 'localhost',
  database: 'BookIt',       
  password: 'postgres',  
  port: 5432,
});

// Funksion për të testuar lidhjen
async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL:', res.rows[0]);
  } catch (err) {
    console.error('Gabim lidhjeje:', err);
  } finally {
    await pool.end();
  }
}

testConnection();
