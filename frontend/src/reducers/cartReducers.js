import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  WISHLIST_ADD_ITEM,
  WISHLIST_DELETE_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], wishListItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case WISHLIST_ADD_ITEM:
      const itemWish = action.payload;

      const existItemWish = state.wishListItems.find(
        (x) => x.product === itemWish.product
      );

      // console.log(item);

      if (existItemWish) {
        return {
          ...state,
          wishListItems: state.wishListItems.map((x) =>
            x.product === existItemWish.product ? itemWish : x
          ),
        };
      } else {
        return {
          ...state,
          wishListItems: [...state.wishListItems, itemWish],
        };
      }

    case WISHLIST_DELETE_ITEM:
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (x) => x.product !== action.payload
        ),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload, //data from form,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload, //data from form,
      };

    default:
      return state;
  }
};

// export const wishListReducer = (state = { wishListItems: [] }, action) => {
//   switch (action.type) {
//     case WISHLIST_ADD_ITEM:
//       const item = action.payload;

//       const existItem = state.wishListItems.find(
//         (x) => x.product === item.product
//       );

//       // console.log(item);

//       if (existItem) {
//         return {
//           ...state,
//           wishListItems: state.wishListItems.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           wishListItems: [...state.wishListItems, item],
//         };
//       }

//     case WISHLIST_DELETE_ITEM:
//       return {
//         ...state,
//         wishListItems: state.wishListItems.filter(
//           (x) => x.product !== action.payload
//         ),
//       };

//     default:
//       return state;
//   }
// };
