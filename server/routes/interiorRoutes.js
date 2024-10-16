import express from 'express';
import InteriorController from '../controllers/interiorController.js';

const router = express.Router();

router.get('/', InteriorController.getInteriors);
router.get('/:id', InteriorController.getInteriorById);
router.post('/', InteriorController.createInterior);
router.put('/:id', InteriorController.updateInterior);
router.delete('/:id', InteriorController.deleteInterior);

export default router;
