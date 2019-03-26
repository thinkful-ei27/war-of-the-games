import { FETCH_GAMES_SUCCESS } from "../actions/gameActions";

const initialState = {
  battleGames: []
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_GAMES_SUCCESS) {
    return Object.assign({}, state, {
      battleGames: action.games
    });
  }
  return state;
}
