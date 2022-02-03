import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc Fetch all products
//@routes GET /api/products
//@access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc Fetch single products
//@routes GET /api/products/:id
//@access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc Delete product by Id
//@routes DELETE /api/products/:id
//@access Private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    //If we only want the user who created the product should have access to delete it we can check that checking user id and seeing if its the owner
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc Create product
//@routes POST /api/products/
//@access Private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    numReviews: 0,
    countInStock: 0,
    description: 'Sample Description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc Update product
//@routes PUT /api/products/:id
//@access Private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});
export { getProductById, getProducts, deleteProduct, createProduct, updateProduct };
