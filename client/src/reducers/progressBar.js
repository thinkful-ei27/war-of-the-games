import { UPDATE_PROGRESS_BAR } from "../actions/progressBar";

const initialState = { loading: false };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROGRESS_BAR:
      return Object.assign({}, state, {
        loading: action.loading
      });
    default:
      return state;
  }
}
