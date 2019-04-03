import {
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_TOP_HISTORY_SUCCESS
} from "../actions/users";

const initialState = {
  history: [],
  topHistory: [],
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        history: [...action.history],
        loading: false
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case GET_USER_TOP_HISTORY_SUCCESS:
      return {
        ...state,
        topHistory: [...action.history]
      };
    default:
      return state;
  }
}
