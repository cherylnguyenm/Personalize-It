import { pool } from '../config/database.js';

// Get all engine types
const getEngineTypes = async (req, res) => {
  try {
    const results = await pool.query('SELECT id, engineName, price, image FROM EngineType ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get engine type by ID
const getEngineTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query('SELECT id, engineName, price, image FROM EngineType WHERE id = $1', [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a new engine type
const createEngineType = async (req, res) => {
  try {
    const { engineName, price, image } = req.body;
    const results = await pool.query('INSERT INTO EngineType (engineName, price, image) VALUES ($1, $2, $3) RETURNING *', [engineName, price, image]);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Update an engine type
const updateEngineType = async (req, res) => {
  try {
    const { id } = req.params;
    const { engineName, price, image } = req.body;
    const results = await pool.query('UPDATE EngineType SET engineName = $1, price = $2, image = $3 WHERE id = $4 RETURNING *', [engineName, price, image, id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Delete an engine type
const deleteEngineType = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query('DELETE FROM EngineType WHERE id = $1 RETURNING *', [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getEngineTypes,
  getEngineTypeById,
  createEngineType,
  updateEngineType,
  deleteEngineType
};
