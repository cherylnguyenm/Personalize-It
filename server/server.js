import express from 'express';
import './config/dotenv.js';
import path from 'path';
import cors from 'cors';
import favicon from 'serve-favicon';

// Import the router from your routes file
import customItemRoutes from './routes/customItemRoutes.js';
import colorRoutes from './routes/colorRoutes.js';
import engineTypeRoutes from './routes/engineTypeRoutes.js';
import interiorRoutes from './routes/interiorRoutes.js';
import modelRoutes from './routes/modelRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); // Parse incoming JSON requests

// Set up CORS middleware
app.use(cors());

// Serve the favicon based on the environment
if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')));
} else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')));
    app.use(express.static('public')); // Serve static files from the 'public' folder in production
}

// API routes for the custom car app
app.use('/api/custom-items', customItemRoutes);    // Routes for CustomItem
app.use('/api/colors', colorRoutes);               // Routes for Color
app.use('/api/engine-types', engineTypeRoutes);    // Routes for EngineType
app.use('/api/interiors', interiorRoutes);         // Routes for Interior
app.use('/api/models', modelRoutes);               // Routes for Model

// Serve the frontend app in production
if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    );
}

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
