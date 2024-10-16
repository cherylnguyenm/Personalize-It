import { pool } from './database.js';
import './dotenv.js';

// Import data from the data folder
import carData from '../data/customitem.js';
import colorData from '../data/colorData.js';
import engineTypeData from '../data/engineTypeData.js';
import interiorData from '../data/interiorData.js';
import modelData from '../data/modelData.js';

// Create all the tables
const createTables = async () => {
    try {
        // Drop dependent tables first
        await pool.query(`DROP TABLE IF EXISTS CustomItem CASCADE;`);

        // Drop attribute tables
        await pool.query(`DROP TABLE IF EXISTS Model CASCADE;`);
        await pool.query(`DROP TABLE IF EXISTS Color CASCADE;`);
        await pool.query(`DROP TABLE IF EXISTS EngineType CASCADE;`);
        await pool.query(`DROP TABLE IF EXISTS Interior CASCADE;`);

        // Recreate Color table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Color (
                id SERIAL PRIMARY KEY,
                colorName VARCHAR(50) NOT NULL
            );
        `);

        // Recreate EngineType table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS EngineType (
                id SERIAL PRIMARY KEY,
                engineName VARCHAR(50) NOT NULL
            );
        `);

        // Recreate Interior table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Interior (
                id SERIAL PRIMARY KEY,
                interiorType VARCHAR(50) NOT NULL
            );
        `);

        // Recreate Model table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Model (
                id SERIAL PRIMARY KEY,
                modelName VARCHAR(50) NOT NULL
            );
        `);

        // Recreate CustomItem table with foreign keys
        await pool.query(`
            CREATE TABLE IF NOT EXISTS CustomItem (
                id SERIAL PRIMARY KEY,
                modelId INT REFERENCES Model(id),
                colorId INT REFERENCES Color(id),
                engineTypeId INT REFERENCES EngineType(id),
                interiorId INT REFERENCES Interior(id),
                totalPrice NUMERIC NOT NULL
            );
        `);

        console.log('Tables created successfully');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};

// Seed the attribute tables
const seedTables = async () => {
    try {
        // Seed Color table
        for (const color of colorData) {
            await pool.query('INSERT INTO Color (colorName) VALUES ($1)', [color.colorName]);
        }

        // Seed EngineType table
        for (const engineType of engineTypeData) {
            await pool.query('INSERT INTO EngineType (engineName) VALUES ($1)', [engineType.engineName]);
        }

        // Seed Interior table
        for (const interior of interiorData) {
            await pool.query('INSERT INTO Interior (interiorType) VALUES ($1)', [interior.interiorType]);
        }

        // Seed Model table
        for (const model of modelData) {
            await pool.query('INSERT INTO Model (modelName) VALUES ($1)', [model.modelName]);
        }

        console.log('Attribute tables seeded successfully');
    } catch (err) {
        console.error('Error seeding tables:', err);
    }
};

// Seed CustomItem table using the attribute IDs
const seedCustomItems = async () => {
    try {
        for (const car of carData) {
            const { model, color, engineType, interior, totalPrice } = car;

            // Get IDs for each attribute
            const modelId = (await pool.query('SELECT id FROM Model WHERE modelName = $1', [model])).rows[0].id;
            const colorId = (await pool.query('SELECT id FROM Color WHERE colorName = $1', [color])).rows[0].id;
            const engineTypeId = (await pool.query('SELECT id FROM EngineType WHERE engineName = $1', [engineType])).rows[0].id;
            const interiorId = (await pool.query('SELECT id FROM Interior WHERE interiorType = $1', [interior])).rows[0].id;

            // Insert into CustomItem table
            await pool.query(`
                INSERT INTO CustomItem (modelId, colorId, engineTypeId, interiorId, totalPrice)
                VALUES ($1, $2, $3, $4, $5)
            `, [modelId, colorId, engineTypeId, interiorId, totalPrice]);

            console.log(`Car ${model} added successfully`);
        }
    } catch (err) {
        console.error('Error inserting CustomItem:', err);
    }
};

// Run all steps
const resetDatabase = async () => {
    await createTables();
    await seedTables();
    await seedCustomItems();
    pool.end();  // Close the database connection after all queries are done
};

// Execute the reset script
resetDatabase();
