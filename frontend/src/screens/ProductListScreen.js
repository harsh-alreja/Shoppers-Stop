import React, { useEffect } from 'react';
//form fields are usually part of usestate
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  deleteProducts,
  listProducts,
  createProduct,
} from '../actions/productActions';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete User ? ')) {
      dispatch(deleteProducts(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col md={{ span: 3, offset: 5 }}>
          <Button
            className='my-3'
            onClick={createProductHandler}
            variant='outline-primary'
          >
            <i className='fas fa-plus' /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}{' '}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}{' '}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>

                <td>&#8377;{product.price}</td>

                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit fa-2x' />
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='primary'
                    className='btn-sm buttonBg'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i
                      className='fas fa-trash-alt fa-2x'
                      style={{ color: 'black' }}
                    />
                    {/* <i class="far fa-trash-alt"></i> */}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
