import update from 'immutability-helper';

// action types / constants
export const CONST_REQUEST_DATA = "CONST_REQUEST_DATA";
export const CONST_UPDATE_DATA = "CONST_UPDATE_DATA";
export const CONST_GET_ONE_DATA = "CONST_GET_ONE_DATA";

// default states
const defaultState = {
  loading: false,
  error: false,
  count: 0,
  data: [],
  filters: {}
};

// initial state
const initialState = {
  data_products: defaultState
}

// reducers
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case CONST_REQUEST_DATA: {
      console.log('CONST_REQUEST_DATA>>>', { state, action });
      const updated = update(state, { [action.dataid]: { data: { $set: action.data } } });
      return updated;
    }

    default:
      return state;
  }
}