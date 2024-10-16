import express from 'express';
import ModelController from '../controllers/modelController.js';

const router = express.Router();

router.get('/', ModelController.getModels);
router.get('/:id', ModelController.getModelById);
router.post('/', ModelController.createModel);
router.put('/:id', ModelController.updateModel);
router.delete('/:id', ModelController.deleteModel);

export default router;
