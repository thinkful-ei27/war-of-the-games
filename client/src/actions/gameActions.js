import axios from "axios";
import { API_BASE_URL } from "../config";
import { fetchCurrentGameSuccess } from "./allGames";

export const FETCH_GAMES = "FETCH_GAMES";

export const FETCH_GAME_REQUEST = "FETCH_GAME_REQUEST";
export const fetchGameRequest = () => ({
  type: FETCH_GAME_REQUEST
});

export const FETCH_FEEDBACK_SUCCESS = "FETCH_FEEDBACK_SUCCESS";
export const fetchFeedbackSuccess = feedback => ({
  type: FETCH_FEEDBACK_SUCCESS,
  feedback
});

export const FETCH_FEEDBACK_ERROR = "FETCH_FEEDBACK_ERROR";
export const fetchFeedbackError = error => ({
  type: FETCH_FEEDBACK_ERROR,
  error
});

export const CLEAR_GAMES = "CLEAR_GAMES";

export const clearGames = () => ({
  type: CLEAR_GAMES
});

export const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS";
export const fetchGamesSuccess = games => ({
  type: FETCH_GAMES_SUCCESS,
  games
});

export const fetchGames = () => (dispatch, getState) => {
  axios({
    url: `${API_BASE_URL}/games/battle`,
    method: "GET"
  })
    .then(response => {
      dispatch(fetchGamesSuccess(response.data));
      return response.data;
    })
    .then(data => {
      const { authToken } = getState().auth;
      const gameOneId = data[0].id;
      const gameTwoId = data[1].id;
      if (data[0].cloudImage === "" || data[1].cloudImage === "") {
        const getFirstGame = () =>
          axios.put(
            `${API_BASE_URL}/games/${gameOneId}/images`,
            {},
            {
              headers: { Authorization: `Bearer ${authToken}` }
            }
          );
        const getSecondGame = () =>
          axios.put(
            `${API_BASE_URL}/games/${gameTwoId}/images`,
            {},
            {
              headers: { Authorization: `Bearer ${authToken}` }
            }
          );
        return axios.all([getFirstGame(), getSecondGame()]);
      }
      return ["no images", "no images"];
    })
    .then(
      axios.spread((gameOne, gameTwo) => {
        console.log(gameOne, gameTwo);
      })
    )
    .catch(err => {
      console.error(err);
    });
};

export const HANDLE_VOTE = "HANDLE_VOTE";

export const handleVote = (gameOne, gameTwo, choice) => () => {
  axios
    .post(`${API_BASE_URL}/history`, {
      gameOne,
      gameTwo,
      choice
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const fetchFeedback = game => dispatch => {
  axios
    .get(`${API_BASE_URL}/history/${game}/results`)
    .then(response => dispatch(fetchFeedbackSuccess(response.data)))
    .catch(err => {
      const { message } = err;
      dispatch(fetchFeedbackError(message));
    });
};

export const updateGame = game => (dispatch, getState) => {
  const { authToken } = getState().auth;
  dispatch(fetchGameRequest());
  axios
    .put(
      `${API_BASE_URL}/games/${game.id}`,
      { igdbId: game.igdb.id },
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    .then(response => dispatch(fetchCurrentGameSuccess(response.data)))
    .catch(err => {
      const { message } = err;
      dispatch(fetchFeedbackError(message));
    });
};
