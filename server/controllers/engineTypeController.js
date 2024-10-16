import { pool } from '../config/database.js';

// Get all engine types
const getEngineTypes = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM EngineType ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get engine type by ID
const getEngineTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query('SELECT * FROM EngineType WHERE id = $1', [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a new engine type
const createEngineType = async (req, res) => {
  try {
    const { engineName } = req.body;
    const results = await pool.query('INSERT INTO EngineType (engineName) VALUES ($1) RETURNING *', [engineName]);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Update an engine type
const updateEngineType = async (req, res) => {
  try {
    const { id } = req.params;
    const { engineName } = req.body;
    const results = await pool.query('UPDATE EngineType SET engineName = $1 WHERE id = $2 RETURNING *', [engineName, id]);
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
