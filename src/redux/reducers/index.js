/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from "redux";
import { default as MANAGE_DATA } from "./manageDataReducers";
import { default as MANAGE_CART } from "./cartReducer";
import { default as MANAGE_ORDER } from "./ordersReducer";

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineReducers({
  MANAGE_DATA,
  MANAGE_CART,
  MANAGE_ORDER
});