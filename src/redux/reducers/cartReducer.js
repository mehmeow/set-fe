import update from 'immutability-helper';
// import { getSum } from '../../Helper/HelperFunctions';

// action types / constants
export const CONST_GET_CART = "CONST_GET_CART";
export const CONST_UPDATE_CART = "CONST_UPDATE_CART";
export const CONST_REMOVE_ITEM = "CONST_REMOVE_ITEM";
export const CONST_ADD_ITEM = "CONST_ADD_ITEM";
export const CONST_SEND_PAY = "CONST_SEND_PAY";

// initial state
const initialState = {
  count: 0,
  cart: [],
  sum: 0
}

function getSum(items, key) {
  return items.reduce(function (a, b) {
    return parseFloat(a) + parseFloat(b[key]);
  }, 0);
};

// reducers
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case CONST_GET_CART: {
      return { ...state, ...action.cart };
    }

    case CONST_ADD_ITEM: {
      // sync data with DB
      const cart = update(state.cart, { $push: [action.item] });

      return {
        count: cart.length,
        cart,
        sum: getSum(cart, "price")
      };
    }

    case CONST_REMOVE_ITEM: {
      const filtered = state.cart.filter(x => x.order_id !== action.order_id);
      const cart = update(state.cart, { $set: filtered });

      return {
        count: cart.length,
        cart,
        sum: getSum(cart, "price")
      };
    }

    case CONST_SEND_PAY: {
      return initialState;
    }

    default:
      return state;
  }
}