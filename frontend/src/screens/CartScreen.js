import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  addToWishList,
  removeFromWishList,
} from '../actions/cartActions';
import { useLocation, useNavigate, useParams } from 'react-router';

const CartScreen = (props) => {
  const { id } = useParams();
  const productId = id;

  let location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, wishListItems } = cart;

  const navigate = useNavigate();

  console.log(cart);

  useEffect(() => {
    if (productId) {
      navigate('/cart');
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty,navigate]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    navigate('/cart');
  };

  //i added this to instead of navigate('login?/redirect=shipping')
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      navigate('/shipping');
    }
    // navigate('/login?redirect=shipping')
  };
  //   const [searchParams] = useSearchParams();
  //   console.log(searchParams);
  //   console.log();
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   console.log( searchParams.get('qty'))=6

  const addToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
    dispatch(removeFromWishList(id));
  };

  const addToWishListHandler = (id) => {
    console.log('added To wishList');
    dispatch(removeFromCart(id));
    dispatch(addToWishList(id));
  };

  const removeFromWishListHandler = (id) => {
    dispatch(removeFromWishList(id));
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <Row>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message>
                Cart Empty ! <Link to='/'>Go Back shopping</Link>
              </Message>
            ) : (
              <>
                {/* <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        ></Image>
                      </Col>
                      <Col md={3}>
                        <Link to={`products/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>&#8377;{item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>

                      <Col md={2}>
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup> */}

                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className='table-sm table-light table-bordered'
                >
                  <thead variant='thead-dark'>
                    <tr>
                      <th>PRODUCTS</th>
                      <th>PRICE</th>
                      <th>QUANTITY</th>
                      <th>Remove From Cart</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <Row>
                            <Col md={4}>
                              <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                                rounded
                              ></Image>
                            </Col>
                            <Col md={5}>
                              <Link
                                to={`/products/${product.product}`}
                                className='no_underline'
                                style={{
                                  paddingLeft: 0,
                                  textDecoration: 'none',
                                }}
                              >
                                {product.name}
                              </Link>
                            </Col>
                            {/* <Col>{product.name}</Col> */}
                          </Row>
                        </td>

                        <td>&#8377;{product.price}</td>

                        <td>
                          <Form.Control
                            as='select'
                            value={product.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  product.product,
                                  Number(e.target.value)
                                )
                              )
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                          <Button
                            variant='info'
                            className='btn-sm'
                            onClick={() =>
                              addToWishListHandler(product.product)
                            }
                          >
                            Save For Later
                          </Button>
                        </td>

                        <td>
                          <Button
                            variant='primary'
                            className='btn-sm buttonBg'
                            onClick={() =>
                              removeFromCartHandler(product.product)
                            }
                          >
                            <i
                              className='fas fa-trash fa-2x'
                              style={{ color: 'black' }}
                            />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Row>

          <Row>
            <h1>Wish List</h1>
            {wishListItems.length === 0 ? (
              <Message>Wish List Empty !</Message>
            ) : (
              <>
                <Table
                  bordered
                  hover
                  responsive
                  className='table-sm table-light table-bordered'
                >
                  <thead variant='thead-dark'>
                    <tr>
                      <th>PRODUCTS</th>
                      <th>PRICE</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {wishListItems.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <Row>
                            <Col md={4}>
                              <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                                rounded
                              ></Image>
                            </Col>
                            <Col md={5}>
                              <Link
                                to={`/products/${product.product}`}
                                style={{
                                  paddingLeft: 0,
                                  textDecoration: 'none',
                                }}
                              >
                                {product.name}
                              </Link>
                            </Col>
                            {/* <Col>{product.name}</Col> */}
                          </Row>
                        </td>

                        <td>&#8377;{product.price}</td>

                        <td>
                          <Button
                            variant='primary'
                            className='btn-sm buttonBg'
                            onClick={() =>
                              removeFromWishListHandler(product.product)
                            }
                          >
                            <i
                              className='fas fa-trash fa-2x'
                              style={{ color: 'black' }}
                            />
                          </Button>

                          <Button
                            variant='outline-primary'
                            className='btn-sm buttonBg'
                            disabled={product.countInStock === 0}
                            onClick={() => addToCartHandler(product.product)}
                          >
                            Add To Cart
                            {/* <i
                              className='fas fa-trash fa-2x'
                              style={{ color: 'black' }}
                            /> */}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Row>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Total Items (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>
                &#8377;
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn btn-primary'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
