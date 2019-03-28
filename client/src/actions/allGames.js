import axios from "axios";
import { API_BASE_URL } from "../config";

export const FETCH_ALL_GAMES = "FETCH_ALL_GAMES";

export const FETCH_ALL_GAMES_REQUEST = "FETCH_ALL_GAMES_REQUEST";

export const FETCH_ALL_GAMES_SUCCESS = "FETCH_ALL_GAMES_SUCCESS";

export const FETCH_ALL_GAMES_ERROR = "FETCH_ALL_GAMES_ERROR";

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
