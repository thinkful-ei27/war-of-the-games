import axios from "axios";
import { API_BASE_URL } from "../config";

export const FETCH_GAMES = "FETCH_GAMES";

export const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS";

export const FETCH_GAMES_ERROR = "FETCH_GAMES_ERROR";

export const fetchGamesSuccess = games => ({
  type: FETCH_GAMES_SUCCESS,
  games
});

export const fetchGames = () => (dispatch, getState) => {
  axios({
    url: "our server url",
    method: "GET"
  })
    .then(response => {
      dispatch(fetchGamesSuccess(response.data));
    })
    .catch(err => {
      console.error(err);
    });
};

export const HANDLE_VOTE = "HANDLE_VOTE";

export const handleVote = (game1, game2, userChoice) => (
  dispatch,
  getState
) => {
  axios
    .post("url", {
      game1,
      game2,
      userChoice
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
