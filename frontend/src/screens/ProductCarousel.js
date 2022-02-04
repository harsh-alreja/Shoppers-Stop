import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listTopProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts())
  },[dispatch])

  return loading?<Loader /> : error ? <Message variant='danger'>{error}</Message>:(
      <>
      <Carousel pause='hover' className='bg-dark'>
          {products.map(product => (
              <Carousel.Item key={product._id}>
                  <Link to={`/products/${product._id}`}>
                      <Image src={product.image} fluid rounded alt={product.name} />
                      <Carousel.Caption className='caraousel-caption'>
                          <h2>{product.name} (&#8377;{product.price})</h2>
                      </Carousel.Caption>
                  </Link>
              </Carousel.Item>
          ))}
      </Carousel>
      </>
  );
};

export default ProductCarousel;
