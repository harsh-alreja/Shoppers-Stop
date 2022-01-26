import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import Colors from 'colors';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running !');
});

app.use('/api/products', productRoutes);


app.use(notFound)
//error handler/middleware
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV}on port ${PORT}`.yellow.bold
  )
);
