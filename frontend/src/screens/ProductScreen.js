import React from 'react';
import { Link } from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating';
import products from '../products';
import { useParams } from "react-router-dom";

const ProductScreen = (props) => {

    const params= useParams()
    // const product = products.find((p) => p._id === Number(this.props.match.params.id))
    const product = products.find((p) => p._id === params.id)

    // console.log(product);
  
    return (
    <>
    <Link className='btn btn-dark my-3' to='/'>
        Go back!
    </Link>
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Rating
                        value = {product.rating}
                        text = {`${product.numReviews} reviews`}
                    />
                </ListGroup.Item>

                <ListGroup.Item>
                    Price:&#8377; {product.price}
                </ListGroup.Item>

                <ListGroup.Item>
                    Description: {product.description}
                </ListGroup.Item>

            </ListGroup>
        </Col>

        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    <strong>
                                        &#8377;{product.price}
                                    </strong>
                                </Col>
                            </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock>0? 'In Stock' : 'Out of Stock'}
                                </Col>
                            </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button className='btn block' type='button' disabled={product.countInStock===0} >
                            Add To Cart
                        </Button>
                    </ListGroup.Item>

                </ListGroup>
            </Card>
        </Col>

    </Row>
    </>
  ); 
};

export default ProductScreen;
