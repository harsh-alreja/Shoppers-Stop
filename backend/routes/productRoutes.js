import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
const router = express.Router();

//@desc Fetch all products
//@routes GET /api/products
//@access Public

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // throw new Error('Some Error in Product.Routes')
    res.json(products);
  })
);

//@desc Fetch single products
//@routes GET /api/products/:id
//@access Public

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    // const product = products.find((p) => p._id === req.params.id )
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
