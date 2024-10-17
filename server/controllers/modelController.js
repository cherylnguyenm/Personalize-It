import { pool } from '../config/database.js';

// Get all models
const getModels = async (req, res) => {
  try {
    const results = await pool.query('SELECT id, modelName, price, image FROM Model ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get model by ID
const getModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query('SELECT id, modelName, price, image FROM Model WHERE id = $1', [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a new model with price and image
const createModel = async (req, res) => {
  try {
    const { modelName, price, image } = req.body;
    const results = await pool.query('INSERT INTO Model (modelName, price, image) VALUES ($1, $2, $3) RETURNING *', [modelName, price, image]);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Update a model with price and image
const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { modelName, price, image } = req.body;
    const results = await pool.query('UPDATE Model SET modelName = $1, price = $2, image = $3 WHERE id = $4 RETURNING *', [modelName, price, image, id]);
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
