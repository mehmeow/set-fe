import update from 'immutability-helper';
// import { getSum } from '../../Helper/HelperFunctions';

// action types / constants
export const CONST_GET_HISTORY = "CONST_GET_HISTORY";

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

    case CONST_GET_HISTORY: {
      return { ...state, ...action.cart };
    }

    default:
      return state;
  }
}