import { pool } from '../config/database.js';

// Get all models
const getModels = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM Model ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get model by ID
const getModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query('SELECT * FROM Model WHERE id = $1', [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a new model
const createModel = async (req, res) => {
  try {
    const { modelName } = req.body;
    const results = await pool.query('INSERT INTO Model (modelName) VALUES ($1) RETURNING *', [modelName]);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Update a model
const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { modelName } = req.body;
    const results = await pool.query('UPDATE Model SET modelName = $1 WHERE id = $2 RETURNING *', [modelName, id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Delete a model
const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query('DELETE FROM Model WHERE id = $1 RETURNING *', [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel
};
