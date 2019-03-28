import { FETCH_GAMES_SUCCESS, CLEAR_GAMES } from "../actions/gameActions";

const initialState = {
  battleGames: [],
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_GAMES_SUCCESS) {
    return Object.assign({}, state, {
      battleGames: action.games
    });
  }
  if (action.type === CLEAR_GAMES) {
    return Object.assign({}, state, {
      battleGames: []
    })
  }
  return state;
}
