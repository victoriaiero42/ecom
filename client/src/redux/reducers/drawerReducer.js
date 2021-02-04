import { SET_VISIBLE } from '../actionTypes';

export function drawerReducer(state = false, action) {
  switch (action.type) {
    case SET_VISIBLE:
      return action.payload;
    default:
      return state;
  }
}