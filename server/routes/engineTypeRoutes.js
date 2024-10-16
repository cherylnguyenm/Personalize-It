import express from 'express';
import EngineTypeController from '../controllers/engineTypeController.js';

const router = express.Router();

router.get('/', EngineTypeController.getEngineTypes);
router.get('/:id', EngineTypeController.getEngineTypeById);
router.post('/', EngineTypeController.createEngineType);
router.put('/:id', EngineTypeController.updateEngineType);
router.delete('/:id', EngineTypeController.deleteEngineType);

export default router;
