import express from 'express';
import CustomItemController from '../controllers/customItemController.js';

const router = express.Router();

router.get('/', CustomItemController.getCustomItems);           // Get all custom items
router.get('/:id', CustomItemController.getCustomItemById);     // Get a specific custom item by ID
router.post('/', CustomItemController.createCustomItem);        // Create a new custom item
router.put('/:id', CustomItemController.updateCustomItem);      // Update a custom item
router.delete('/:id', CustomItemController.deleteCustomItem);   // Delete a custom item

export default router;
