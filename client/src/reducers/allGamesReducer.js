import {
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
  FETCH_ALL_GAMES_ERROR
} from "../actions/allGames";

const initialState = {
  games: [],
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_ALL_GAMES_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }
  if (action.type === FETCH_ALL_GAMES_SUCCESS) {
    return Object.assign({}, state, {
      games: action.games,
      loading: false
    });
  }
  if (action.type === FETCH_ALL_GAMES_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}
