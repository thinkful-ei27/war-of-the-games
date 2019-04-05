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

export const GET_USER_TOP_HISTORY_SUCCESS = "GET_USER_TOP_HISTORY_SUCCESS";
export const getUserTopHistorySuccess = history => ({
  type: GET_USER_TOP_HISTORY_SUCCESS,
  history
});

export const POST_USER_ABOUT_ME_REQUEST = "POST_USER_ABOUT_ME_REQUEST";
export const postUserAboutMeRequest = () => ({
  type: POST_USER_ABOUT_ME_REQUEST
});

export const POST_USER_ABOUT_ME_SUCCESS = "POST_USER_ABOUT_ME_SUCCESS";
export const postUserAboutMeSuccess = content => {
  return {
    type: POST_USER_ABOUT_ME_SUCCESS,
    content
  };
};

export const POST_USER_ABOUT_ME_ERROR = "POST_USER_ABOUT_ME_ERROR";
export const postUserAboutMeError = error => ({
  type: POST_USER_ABOUT_ME_ERROR,
  error
});

export const GET_USER_ABOUT_ME_REQUEST = "GET_USER_ABOUT_ME_REQUEST";
export const getUserAboutMRequest = () => ({
  type: GET_USER_ABOUT_ME_REQUEST
});
export const GET_USER_ABOUT_ME_SUCCESS = "GET_USER_ABOUT_ME_SUCCESS";
export const getUserAboutMeSuccess = content => ({
  type: GET_USER_ABOUT_ME_SUCCESS,
  content
});
export const GET_USER_ABOUT_ME_ERROR = "GET_USER_ABOUT_ME_SUCCESS";
export const getUserAboutMeError = error => ({
  type: GET_USER_ABOUT_ME_ERROR,
  error
});

export const getUserAboutMe = content => (dispatch, getState) => {
  const { authToken } = getState().auth;
  dispatch(getUserAboutMRequest());
  return fetch(`${API_BASE_URL}/users/aboutMe`, {
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
    .then(data => dispatch(getUserAboutMeSuccess(data)))
    .catch(err => dispatch(getUserAboutMeError(err)));
};

export const postUserAboutMe = content => (dispatch, getState) => {
  dispatch(postUserAboutMeRequest());

  const { authToken } = getState().auth;
  const aboutMe = { content };
  // eslint-disable-next-line no-undef
  return fetch(`${API_BASE_URL}/users/aboutMe`, {
    method: "POST",
    body: JSON.stringify(aboutMe),
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res;
    })
    .then(() => {
      console.log(content);
      dispatch(postUserAboutMeSuccess(content));
    })
    .catch(err => dispatch(postUserAboutMeError(err)));
};

export const getUserTopHistory = userId => (dispatch, getState) => {
  dispatch(getUserRequest());
  const { authToken } = getState().auth;
  return fetch(`${API_BASE_URL}/users/${userId}/topHistory`, {
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
    .then(data => dispatch(getUserTopHistorySuccess(data)))
    .catch(err => dispatch(getUserError(err)));
};
export const getUser = userId => (dispatch, getState) => {
  dispatch(getUserRequest());

  const { authToken } = getState().auth;
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
    .catch(err => dispatch(getUserAboutMeError(err)));
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
