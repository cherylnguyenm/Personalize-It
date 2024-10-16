import express from 'express';
import ColorController from '../controllers/colorController.js';

const router = express.Router();

router.get('/', ColorController.getColors);        // Get all colors
router.post('/', ColorController.createColor);     // Create a new color

export default router;
