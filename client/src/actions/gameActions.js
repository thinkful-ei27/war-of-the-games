import axios from "axios";
import { API_BASE_URL } from "../config";

export const FETCH_GAMES = "FETCH_GAMES";

export const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS";

export const FETCH_GAMES_ERROR = "FETCH_GAMES_ERROR";

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

export const fetchGamesSuccess = games => ({
  type: FETCH_GAMES_SUCCESS,
  games
});

export const fetchGames = () => (dispatch, getState) => {
  axios({
    url: "http://localhost:8080/api/games/battle",
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

export const handleVote = (gameOne, gameTwo, choice) => (
  dispatch,
  getState
) => {
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
    .then(response => dispatch(fetchFeedbackSuccess(response)))
    .catch(err => dispatch(fetchFeedbackError(err)));
};
