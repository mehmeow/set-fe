import {
  CONST_GET_CART,
  CONST_UPDATE_CART,
  CONST_REMOVE_ITEM,
  CONST_ADD_ITEM,
  CONST_SEND_PAY
} from "../reducers/cartReducer";

// get initial cart
export const ACTION_GET_CART = (cart) => {
  return ({
    type: CONST_GET_CART,
    cart
  })
};

// to update in bulk
export const ACTION_UPDATE_CART = (cart) => {
  return ({
    type: CONST_UPDATE_CART,
    cart
  })
};

export const ACTION_ADD_ITEM = (item) => {
  return ({
    type: CONST_ADD_ITEM,
    item
  })
};

export const ACTION_REMOVE_ITEM = (order_id) => {
  return ({
    type: CONST_REMOVE_ITEM,
    order_id
  })
};

export const ACTION_SEND_PAY = () => {
  return ({
    type: CONST_SEND_PAY
  })
};