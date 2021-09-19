import {
  CONST_GET_HISTORY
} from "../reducers/ordersReducer";

export const ACTION_GET_HISTORY = (cart) => {
  return ({
    type: CONST_GET_HISTORY,
    cart
  })
};