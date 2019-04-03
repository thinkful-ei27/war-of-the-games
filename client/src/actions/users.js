import { SubmissionError } from "redux-form";

import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const getUserRequest = () => ({
  type: GET_USER_REQUEST
});

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const getUserSuccess = history => ({
  type: GET_USER_SUCCESS,
  history
});
export const GET_USER_ERROR = "GET_USER_ERROR";
export const getUserError = error => ({
  type: GET_USER_SUCCESS,
  error
});

export const getUser = userId => (dispatch, getState) => {
  dispatch(getUserRequest());

  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/users/${userId}/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      return dispatch(getUserSuccess(data));
    })
    .catch(err => dispatch(getUserError(err)));
};

export const registerUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};
