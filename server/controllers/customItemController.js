import { pool } from '../config/database.js'; // Import the pool from the database config

// Controller to get all custom items (with dynamic total price calculation)
const getCustomItems = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT ci.id, m.modelName, c.colorName, e.engineName, i.interiorType, 
             (m.price + c.price + e.price + i.price) AS totalPrice
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

// Controller to get a specific custom item by ID (with dynamic total price calculation)
const getCustomItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT ci.id, m.modelName, c.colorName, e.engineName, i.interiorType, 
             (m.price + c.price + e.price + i.price) AS totalPrice
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

// Controller to create a new custom item (with dynamic total price calculation)
const createCustomItem = async (req, res) => {
  try {
    const { modelId, colorId, engineTypeId, interiorId } = req.body;

    // Calculate total price based on the selected features
    const totalPriceQuery = `
      SELECT 
        (SELECT price FROM Model WHERE id = $1) +
        (SELECT price FROM Color WHERE id = $2) +
        (SELECT price FROM EngineType WHERE id = $3) +
        (SELECT price FROM Interior WHERE id = $4) AS totalPrice
    `;
    const totalPriceResult = await pool.query(totalPriceQuery, [modelId, colorId, engineTypeId, interiorId]);
    const totalPrice = totalPriceResult.rows[0].totalprice;

    const query = `
      INSERT INTO CustomItem (modelId, colorId, engineTypeId, interiorId)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const results = await pool.query(query, [modelId, colorId, engineTypeId, interiorId]);
    res.status(201).json({ ...results.rows[0], totalPrice });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Controller to update a custom item by ID (with dynamic total price calculation)
const updateCustomItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { modelId, colorId, engineTypeId, interiorId } = req.body;

    // Calculate total price based on the selected features
    const totalPriceQuery = `
      SELECT 
        (SELECT price FROM Model WHERE id = $1) +
        (SELECT price FROM Color WHERE id = $2) +
        (SELECT price FROM EngineType WHERE id = $3) +
        (SELECT price FROM Interior WHERE id = $4) AS totalPrice
    `;
    const totalPriceResult = await pool.query(totalPriceQuery, [modelId, colorId, engineTypeId, interiorId]);
    const totalPrice = totalPriceResult.rows[0].totalprice;

    const query = `
      UPDATE CustomItem
      SET modelId = $1, colorId = $2, engineTypeId = $3, interiorId = $4
      WHERE id = $5
      RETURNING *
    `;
    const results = await pool.query(query, [modelId, colorId, engineTypeId, interiorId, id]);
    res.status(200).json({ ...results.rows[0], totalPrice });
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
