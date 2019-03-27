import {
  FETCH_GAMES_SUCCESS,
  FETCH_FEEDBACK_SUCCESS
} from "../actions/gameActions";

const initialState = {
  battleGames: [],
  feedback: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_GAMES_SUCCESS) {
    return Object.assign({}, state, {
      battleGames: action.games
    });
  }
  if (action.type === FETCH_FEEDBACK_SUCCESS) {
    return Object.assign({}, state, {
      feedback: action.feedback
    });
  }
  return state;
}
