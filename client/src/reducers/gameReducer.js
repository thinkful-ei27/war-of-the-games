import { FETCH_GAMES_SUCCESS, INCREMENT_SESSION_COUNT, RESET_SESSION_COUNT } from "../actions/gameActions";

const initialState = {
  battleGames: [],
  sessionVoteCount: 0
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_GAMES_SUCCESS) {
    return Object.assign({}, state, {
      battleGames: action.games
    });
  }
  else if (action.type === INCREMENT_SESSION_COUNT) {
    return Object.assign({}, state, {
      sessionVoteCount: state.sessionVoteCount += 1
    })
  }
  return state;
}
