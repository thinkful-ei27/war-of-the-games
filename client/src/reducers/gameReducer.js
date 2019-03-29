import {
  FETCH_GAMES_SUCCESS,
  FETCH_FEEDBACK_SUCCESS,
  FETCH_FEEDBACK_ERROR,
  CLEAR_GAMES,
  SET_NON_USER_VOTES,
  CLEAR_NON_USER_VOTES
} from "../actions/gameActions";

const initialState = {
  battleGames: [],
  nonUserVotes: [],
  feedback: null,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_GAMES_SUCCESS) {
    return Object.assign({}, state, {
      battleGames: action.games,
      error: null
    });
  }
  if (action.type === FETCH_FEEDBACK_SUCCESS) {
    return Object.assign({}, state, {
      feedback: action.feedback,
      error: null
    });
  }
  if (action.type === FETCH_FEEDBACK_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  if (action.type === CLEAR_GAMES) {
    return Object.assign({}, state, {
      battleGames: []
    });
  }
  if (action.type === SET_NON_USER_VOTES) {
    return Object.assign({}, state, {
      nonUserVotes: [...state.nonUserVotes, action.vote]
    })
  }
  if (action.type === CLEAR_NON_USER_VOTES) {
    return Object.assign({}, state, {
      nonUserVotes: []
    })
  }
  return state;
}
