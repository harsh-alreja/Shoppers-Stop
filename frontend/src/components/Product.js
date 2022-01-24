import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'



const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link id='no_underline' to={`/product/${product._id}`}>
          <Card.Title as='h5'>
            <>{product.name}</>
          </Card.Title>
        </Link>

        <Card.Text className='small'>
          <Rating
            value = {product.rating}
            text = {`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>
            &#8377; {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product