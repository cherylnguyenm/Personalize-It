import { pool } from '../config/database.js';

// Get all colors
const getColors = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM Color ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a new color
const createColor = async (req, res) => {
  try {
    const { colorName } = req.body;
    const results = await pool.query('INSERT INTO Color (colorName) VALUES ($1) RETURNING *', [colorName]);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Export the functions
export default {
  getColors,
  createColor
};
