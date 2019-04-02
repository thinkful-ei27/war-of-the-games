import {
  FETCH_GAMES_SUCCESS,
  FETCH_FEEDBACK_SUCCESS,
  FETCH_FEEDBACK_ERROR,
  CLEAR_GAMES,
  SET_NON_USER_VOTES,
  CLEAR_NON_USER_VOTES,
  FETCH_GAME_REQUEST
} from "../actions/gameActions";

const initialState = {
  battleGames: [],
  nonUserVotes: [],
  feedback: null,
  error: null,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GAME_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true
      });
    case FETCH_GAMES_SUCCESS:
      return Object.assign({}, state, {
        battleGames: action.games,
        error: null
      });
    case FETCH_FEEDBACK_SUCCESS:
      return Object.assign({}, state, {
        feedback: action.feedback,
        error: null
      });
    case FETCH_FEEDBACK_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    case CLEAR_GAMES:
      return Object.assign({}, state, {
        battleGames: []
      });
    case SET_NON_USER_VOTES:
      return Object.assign({}, state, {
        nonUserVotes: [...state.nonUserVotes, action.vote]
      });
    case CLEAR_NON_USER_VOTES:
      return Object.assign({}, state, {
        nonUserVotes: []
      });
    default:
      return state;
  }
}