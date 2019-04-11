import axios from "axios";
import { API_BASE_URL } from "../config";

export const FETCH_ALL_GAMES_REQUEST = "FETCH_ALL_GAMES_REQUEST";
export const FETCH_ALL_GAMES_SUCCESS = "FETCH_ALL_GAMES_SUCCESS";
export const FETCH_ALL_GAMES_ERROR = "FETCH_ALL_GAMES_ERROR";

export const FETCH_CURRENT_GAME_REQUEST = "FETCH_CURRENT_GAME_REQUEST";
export const FETCH_CURRENT_GAME_SUCCESS = "FETCH_CURRENT_GAME_SUCCESS";
export const FETCH_CURRENT_GAME_ERROR = "FETCH_CURRENT_GAME_ERROR";

export const fetchGamesRequest = () => ({
  type: FETCH_ALL_GAMES_REQUEST
});

export const fetchGamesSuccess = games => ({
  type: FETCH_ALL_GAMES_SUCCESS,
  games
});

export const fetchGamesError = error => ({
  type: FETCH_ALL_GAMES_ERROR,
  error
});

export const fetchAllGames = () => dispatch => {
  dispatch(fetchGamesRequest());
  return axios({
    url: `${API_BASE_URL}/games`,
    method: "GET"
  })
    .then(response => {
      dispatch(fetchGamesSuccess(response.data));
    })
    .catch(err => {
      dispatch(fetchGamesError(err));
    });
};

export const FETCH_CURRENT_FEEDBACK_SUCCESS = "FETCH_CURRENT_FEEDBACK_SUCCESS";
export const fetchCurrentFeedbackSuccess = currentFeedback => ({
  type: FETCH_CURRENT_FEEDBACK_SUCCESS,
  currentFeedback
});

export const FETCH_CURRENT_FEEDBACK_ERROR = "FETCH_CURRENT_FEEDBACK_ERROR";
export const fetchCurrentFeedbackError = error => ({
  type: FETCH_CURRENT_FEEDBACK_ERROR,
  error
});

export const fetchCurrentFeedback = game => dispatch => {
  axios
    .get(`${API_BASE_URL}/history/${game}/results`)
    .then(response => dispatch(fetchCurrentFeedbackSuccess(response.data)))
    .catch(err => {
      const { message } = err;
      dispatch(fetchCurrentFeedbackError(message));
    });
};

export const fetchCurrentGameRequest = () => ({
  type: FETCH_CURRENT_GAME_REQUEST
});

export const fetchCurrentGameSuccess = currentGame => ({
  type: FETCH_CURRENT_GAME_SUCCESS,
  currentGame
});

export const fetchCurrentGameError = error => ({
  type: FETCH_CURRENT_GAME_ERROR,
  error
});

export const fetchCurrentGame = slug => (dispatch, getState) => {
  const { authToken } = getState().auth;
  dispatch(fetchCurrentGameRequest());
  return axios({
    url: `${API_BASE_URL}/games?slug=${slug}`,
    method: "GET"
  })
    .then(response => {
      if (response.data.length < 1) {
        return axios({
          url: `${API_BASE_URL}/games/igdb/${slug}`,
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` }
        }).then(result => {
          const freshId = result.data[0].id;
          return axios({
            url: `${API_BASE_URL}/games`,
            method: "POST",
            data: {
              igdbId: freshId
            },
            headers: { Authorization: `Bearer ${authToken}` }
          }).then(response => {
            const theFinalResult = {
              data: [response.data]
            };
            return theFinalResult;
          });
        });
      }
      return response;
    })
    .then(response => {
      const { id } = response.data[0];
      dispatch(fetchCurrentFeedback(id));
      return axios({
        url: `${API_BASE_URL}/games/${id}`,
        method: "GET"
      });
    })
    .then(gameData => {
      dispatch(fetchCurrentGameSuccess(gameData.data));
    })
    .catch(err => {
      dispatch(fetchCurrentGameError(err));
    });
};
