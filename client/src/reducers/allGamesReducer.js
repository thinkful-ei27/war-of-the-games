import {
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
  FETCH_ALL_GAMES_ERROR,
  FETCH_CURRENT_GAME_REQUEST,
  FETCH_CURRENT_GAME_SUCCESS,
  FETCH_CURRENT_GAME_ERROR,
  FETCH_CURRENT_FEEDBACK_SUCCESS,
  FETCH_CURRENT_FEEDBACK_ERROR
} from "../actions/allGames";

const initialState = {
  games: [],
  currentGame: null,
  currentFeedback: null,
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
  if (action.type === FETCH_CURRENT_GAME_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      currentGame: null
    });
  }
  if (action.type === FETCH_CURRENT_GAME_SUCCESS) {
    console.log("fetchCurrentGameSuccess ran");
    return Object.assign({}, state, {
      currentGame: action.currentGame,
      loading: false
    });
  }
  if (action.type === FETCH_CURRENT_GAME_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  if (action.type === FETCH_CURRENT_FEEDBACK_SUCCESS) {
    return Object.assign({}, state, {
      currentFeedback: action.currentFeedback,
      error: null
    });
  }
  if (action.type === FETCH_CURRENT_FEEDBACK_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
