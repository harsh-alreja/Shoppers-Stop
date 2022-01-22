import React from 'react';
import { Card } from 'react-bootstrap'; 
import Rating from './Rating'

const product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <a href={`/product/${product._id}`}>
            <Card.Img src = {product.image} variant='top' />
        </a>
        <Card.Body as='small'>
            <a href={`/product/${product._id}`}>
                
                <Card.Title as='div'>
                    <strong >
                        {product.name}
                    </strong>
                </Card.Title>   
                </a>
                <Card.Text as='small'>
                    <Rating 
                        value={product.rating} 
                        text={`${product.numReviews}`}
                    />
                </Card.Text>

                <Card.Text as='h4'>
                    {/* <i className='fa fa-inr'></i>{product.price} */}
                    &#8377;{product.price}/-
                    {/* money sign */}
                </Card.Text>
        </Card.Body>
    </Card>
  );
};

export default product;
