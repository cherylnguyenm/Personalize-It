import { pool } from '../config/database.js';

// Get all interior types
const getInteriors = async (req, res) => {
  try {
    const results = await pool.query('SELECT id, interiorType, price, image FROM Interior ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get interior type by ID
const getInteriorById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query('SELECT id, interiorType, price, image FROM Interior WHERE id = $1', [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a new interior type with price and image
const createInterior = async (req, res) => {
  try {
    const { interiorType, price, image } = req.body;
    const results = await pool.query('INSERT INTO Interior (interiorType, price, image) VALUES ($1, $2, $3) RETURNING *', [interiorType, price, image]);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Update an interior type with price and image
const updateInterior = async (req, res) => {
  try {
    const { id } = req.params;
    const { interiorType, price, image } = req.body;
    const results = await pool.query('UPDATE Interior SET interiorType = $1, price = $2, image = $3 WHERE id = $4 RETURNING *', [interiorType, price, image, id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Delete an interior type
const deleteInterior = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query('DELETE FROM Interior WHERE id = $1 RETURNING *', [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getInteriors,
  getInteriorById,
  createInterior,
  updateInterior,
  deleteInterior
};
