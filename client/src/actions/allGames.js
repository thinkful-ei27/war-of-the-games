import axios from "axios";
import { API_BASE_URL } from "../config";

export const FETCH_ALL_GAMES_REQUEST = "FETCH_ALL_GAMES_REQUEST";
export const FETCH_ALL_GAMES_SUCCESS = "FETCH_ALL_GAMES_SUCCESS";
export const FETCH_ALL_GAMES_ERROR = "FETCH_ALL_GAMES_ERROR";

export const FETCH_CURRENT_GAME_REQUEST = "FETCH_CURRENT_GAMES_REQUEST";
export const FETCH_CURRENT_GAME_SUCCESS = "FETCH_CURRENT_GAMES_SUCCESS";
export const FETCH_CURRENT_GAME_ERROR = "FETCH_CURRENT_GAMES_ERROR";

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
      console.error(err);
      dispatch(fetchGamesError(err));
    });
};

export const FETCH_CURRENT_FEEDBACK_SUCCESS = "FETCH_CURRENT_FEEDBACK_SUCCESS";
export const fetchCurrentFeedbackSuccess = feedback => ({
  type: FETCH_CURRENT_FEEDBACK_SUCCESS,
  feedback
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

export const fetchCurrentGame = slug => dispatch => {
  dispatch(fetchCurrentGameRequest());
  return axios({
    url: `${API_BASE_URL}/games?slug=${slug}`,
    method: "GET"
  })
    .then(response => {
      dispatch(fetchCurrentGameSuccess(response.data[0]));
      return response.data[0];
    })
    .then(gameData => {
      console.log(gameData);
      const { id } = gameData;
      dispatch(fetchCurrentFeedback(id));
    })
    .catch(err => {
      console.error(err);
      dispatch(fetchCurrentGameError(err));
    });
};
