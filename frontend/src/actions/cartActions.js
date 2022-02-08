import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  WISHLIST_ADD_ITEM,
  WISHLIST_DELETE_ITEM,
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_DELETE_ITEM,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


//takes in form data
export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => async(dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
}



export const addToWishList = (id) => async (dispatch, getState) => {
  console.log('action Added To WishList');
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
    },
  });

  localStorage.setItem('wishListItems', JSON.stringify(getState().cart.wishListItems));
};

export const removeFromWishList = (id) => async (dispatch, getState) => {
  dispatch({
    type: WISHLIST_DELETE_ITEM,
    payload: id,
  });
  localStorage.setItem('wishListItems', JSON.stringify(getState().cart.wishListItems));
};