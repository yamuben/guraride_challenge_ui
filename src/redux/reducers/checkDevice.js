import {  CHECK_DEVICE_LOCATION,LOADING } from "../actionTypes";

export const initialState = { status: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHECK_DEVICE_LOCATION:
      return { ...state, ...payload };
      case LOADING:
        return { ...state, ...payload };
    default:
      return state;
  }
};
