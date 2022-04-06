import { GET_ALL_DEVICES, LOADING } from "../actionTypes";

export const initialState = { status: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DEVICES:
      return { ...state, ...payload };
      case LOADING:
        return { ...state, ...payload };
    default:
      return state;
  }
};
