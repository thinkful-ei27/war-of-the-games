import { FETCH_GAMES_SUCCESS } from "../actions/gameActions";

const initialState = {
  battleGames: [
    {
      title: "The legend of Zelda: Ocarina of time",
      src:
        "https://webgames.host/uploads/2017/06/legend-of-zelda-ocarina-of-time.png"
    },
    {
      title: "Super Smash Bros.",
      src:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Supersmashbox.jpg/220px-Supersmashbox.jpg"
    }
  ]
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_GAMES_SUCCESS) {
    return Object.assign({}, state, {
      battleGames: [action.games]
    });
  }
  return state;
}
