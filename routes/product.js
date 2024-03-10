const express = require('express');
const productController = require('../controller/product');

const router = express.Router();

router
  .post('/test', productController.test)
  .post('/', productController.createProduct)
  .get('/', productController.getAllProducts)
  .get('/:id', productController.getProduct)
  .put('/:id', productController.replaceProduct)
  .patch('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct)
  .post('/sell', productController.sellProducts)
  .post('/write', productController.writeProducts);

exports.router = router;  