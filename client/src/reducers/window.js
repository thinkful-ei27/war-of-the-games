import { WINDOW_SIZE } from "../actions/window";

const initialState = {
  width: null,
  height: null
};

export default (state = initialState, action) => {
  if (action.type === WINDOW_SIZE) {
    return Object.assign({}, state, {
      width: action.width,
      height: action.height
    });
  }
  return state;
};
