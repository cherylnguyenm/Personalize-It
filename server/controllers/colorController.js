import { pool } from '../config/database.js';

// Get all colors
const getColors = async (req, res) => {
  try {
    const results = await pool.query('SELECT id, colorName, price, image FROM Color ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a new color with price and image
const createColor = async (req, res) => {
  try {
    const { colorName, price, image } = req.body;
    const results = await pool.query('INSERT INTO Color (colorName, price, image) VALUES ($1, $2, $3) RETURNING *', [colorName, price, image]);
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
