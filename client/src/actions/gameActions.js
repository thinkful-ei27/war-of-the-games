import axios from "axios";
import { API_BASE_URL } from "../config";
import { fetchCurrentGameSuccess } from "./allGames";
import { normalizeResponseErrors } from "./utils";

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

export const fetchImages = (gameOneId, gameTwoId, authToken) => {
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
};

export const fetchGames = () => (dispatch, getState) => {
  const { authToken } = getState().auth;
  const options = {};
  dispatch(fetchGameRequest());
  console.log("this ran");
  if (authToken) {
    options.headers = { Authorization: `Bearer ${authToken}` };
  }
  fetch(`${API_BASE_URL}/games/battle`, options)
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      dispatch(fetchGamesSuccess(data));
      const gameOneId = data[0].id;
      const gameTwoId = data[1].id;
      return !data[0].cloudImage || !data[1].cloudImage
        ? fetchImages(gameOneId, gameTwoId, authToken)
        : "No images fetched";
    })
    .then(result => {
      return result;
    })
    .catch(err => fetchFeedbackError(err));
};

export const HANDLE_VOTE = "HANDLE_VOTE";

export const handleVote = (gameOne, gameTwo, choice, userId) => (
  dispatch,
  getState
) => {
  const { authToken } = getState().auth;
  axios
    .post(
      `${API_BASE_URL}/history`,
      {
        gameOne,
        gameTwo,
        choice,
        userId
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    .then(response => response)
    .catch(error => console.log(error));
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

export const SET_NON_USER_VOTES = "SET_NON_USER_VOTES";

export const CLEAR_NON_USER_VOTES = "CLEAR_NON_USER_VOTES";

export const clearNonUserVotes = () => ({
  type: CLEAR_NON_USER_VOTES
});

export const setNonUserVotes = (gameOne, gameTwo, choice) => ({
  type: SET_NON_USER_VOTES,
  vote: { gameOne, gameTwo, choice }
});
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
