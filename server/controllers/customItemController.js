import { pool } from '../config/database.js'; // Import the pool from the database config

// Controller to get all custom items
const getCustomItems = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT ci.id, m.modelName, c.colorName, e.engineName, i.interiorType, ci.totalPrice
      FROM CustomItem ci
      JOIN Model m ON ci.modelId = m.id
      JOIN Color c ON ci.colorId = c.id
      JOIN EngineType e ON ci.engineTypeId = e.id
      JOIN Interior i ON ci.interiorId = i.id
      ORDER BY ci.id ASC
    `);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Controller to get a specific custom item by ID
const getCustomItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT ci.id, m.modelName, c.colorName, e.engineName, i.interiorType, ci.totalPrice
      FROM CustomItem ci
      JOIN Model m ON ci.modelId = m.id
      JOIN Color c ON ci.colorId = c.id
      JOIN EngineType e ON ci.engineTypeId = e.id
      JOIN Interior i ON ci.interiorId = i.id
      WHERE ci.id = $1
    `;
    const results = await pool.query(query, [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Controller to create a new custom item
const createCustomItem = async (req, res) => {
  try {
    const { modelId, colorId, engineTypeId, interiorId, totalPrice } = req.body;
    const query = `
      INSERT INTO CustomItem (modelId, colorId, engineTypeId, interiorId, totalPrice)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const results = await pool.query(query, [modelId, colorId, engineTypeId, interiorId, totalPrice]);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Controller to update a custom item by ID
const updateCustomItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { modelId, colorId, engineTypeId, interiorId, totalPrice } = req.body;
    const query = `
      UPDATE CustomItem
      SET modelId = $1, colorId = $2, engineTypeId = $3, interiorId = $4, totalPrice = $5
      WHERE id = $6
      RETURNING *
    `;
    const results = await pool.query(query, [modelId, colorId, engineTypeId, interiorId, totalPrice, id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Controller to delete a custom item by ID
const deleteCustomItem = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query('DELETE FROM CustomItem WHERE id = $1 RETURNING *', [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getCustomItems,
  getCustomItemById,
  createCustomItem,
  updateCustomItem,
  deleteCustomItem
};
