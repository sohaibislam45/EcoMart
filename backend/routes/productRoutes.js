const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// For now, no authentication middleware on these routes for simplicity during development
// In production, create/update/delete should be protected

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
