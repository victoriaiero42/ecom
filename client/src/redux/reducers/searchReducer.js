import { SEARCH_QUERY } from '../actionTypes';

export function searchReducer(state = { text: '' }, action) {
  switch (action.type) {
    case SEARCH_QUERY:
      return { ...state, ...action.payload };
    // case LOGOUT:
    //   return action.payload;
    default:
      return state;
  }
}