import { FETCH_GAMES_SUCCESS } from '../actions/gameActions'


const initialState = {
  currentGames: []
}

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_GAMES_SUCCESS) {
    return Object.assign({}, state, {
      currentGames: [...state.currentGames, action.games]
    })
  }
  return state
}