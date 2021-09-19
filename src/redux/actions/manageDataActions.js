import { CONST_REQUEST_DATA, CONST_UPDATE_DATA, CONST_GET_ONE_DATA } from "../reducers/manageDataReducers";

export const ACTION_REQUEST_DATA = (dataid, data, child = []) => {
  console.log('ACTION_REQUEST_DATA', { type: CONST_REQUEST_DATA, dataid, data, child });
  return ({
    type: CONST_REQUEST_DATA,
    dataid, // data id
    data,
    child
  })
};

export const ACTION_UPDATE_DATA = (dataid, data, child = []) => ({
  type: CONST_UPDATE_DATA,
  dataid, // data id
  data,
  child
});

export const ACTION_GET_ONE_DATA = (dataid, id, child = []) => ({
  type: CONST_GET_ONE_DATA,
  dataid, // data id
  id, // spesific id
  child
});
