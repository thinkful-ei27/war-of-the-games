import { SubmissionError } from "redux-form";

import axios from "axios";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";
import { fetchGames } from "./gameActions";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const getUserSuccess = history => ({
  type: GET_USER_SUCCESS,
  history
});

export const GET_USER_TOP_HISTORY_SUCCESS = "GET_USER_TOP_HISTORY_SUCCESS";
export const getUserTopHistorySuccess = history => ({
  type: GET_USER_TOP_HISTORY_SUCCESS,
  history
});

export const POST_USER_ABOUT_ME_SUCCESS = "POST_USER_ABOUT_ME_SUCCESS";
export const postUserAboutMeSuccess = content => {
  return {
    type: POST_USER_ABOUT_ME_SUCCESS,
    content
  };
};

export const GET_USER_ABOUT_ME_SUCCESS = "GET_USER_ABOUT_ME_SUCCESS";
export const getUserAboutMeSuccess = content => ({
  type: GET_USER_ABOUT_ME_SUCCESS,
  content
});

export const GET_USER_MOTIVATIONS_REQUEST = "GET_USER_MOTIVATIONS_REQUEST";
export const getUserMotivationsRequest = () => ({
  type: GET_USER_MOTIVATIONS_REQUEST
});
export const GET_USER_MOTIVATIONS_SUCCESS = "GET_USER_MOTIVATIONS_SUCCESS";
export const getUserMotivationsSuccess = data => ({
  type: GET_USER_MOTIVATIONS_SUCCESS,
  data
});
export const GET_USER_MOTIVATIONS_ERROR = "GET_USER_MOTIVATIONS_ERROR";
export const getUserMotivationsError = error => ({
  type: GET_USER_MOTIVATIONS_ERROR,
  error
});

export const GET_USER_SUBMOTIVATIONS_SUCCESS =
  "GET_USER_SUBMOTIVATIONS_SUCCESS";
export const getUserSubmotivationsSuccess = content => ({
  type: GET_USER_SUBMOTIVATIONS_SUCCESS,
  content
});

export const USER_ADD_WISHLIST_SUCCESS = "USER_ADD_WISHLIST_SUCCESS";
export const userAddWishListSuccess = () => ({
  type: USER_ADD_WISHLIST_SUCCESS
});

export const USER_FETCH_REQUEST = "USER_FETCH_REQUEST";
export const userFetchRequest = () => ({
  type: USER_FETCH_REQUEST
});

export const USER_FETCH_SUCCESS = "USER_FETCH_SUCCESS";
export const userFetchSuccess = userInfo => ({
  type: USER_FETCH_SUCCESS,
  userInfo
});
export const UPDATE_PIC_SUCCESS = "UPDATE_PIC_SUCCESS";
export const updatePicSuccess = pic => ({
  type: UPDATE_PIC_SUCCESS,
  pic
});

export const USER_FETCH_ERROR = "USER_FETCH_ERROR";
export const userFetchError = error => ({
  type: USER_FETCH_ERROR,
  error
});

export const USER_WISH_LIST_SUCCESS = "USER_WISH_LIST_SUCCESS";
export const userWishListSuccess = wishList => ({
  type: USER_WISH_LIST_SUCCESS,
  wishList
});

export const fetchByUsername = username => dispatch => {
  dispatch(userFetchRequest());
  return fetch(`${API_BASE_URL}/users?username=${username}`)
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(userFetchSuccess(res)))
    .catch(err => dispatch(userFetchError(err)));
};

export const fetchUser = userId => (dispatch, getState) => {
  const { authToken } = getState().auth;
  dispatch(userFetchRequest());

  return fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(userFetchSuccess(res)))
    .catch(err => dispatch(userFetchError(err)));
};

export const getUserMotivationData = () => (dispatch, getState) => {
  const { authToken } = getState().auth;
  dispatch(userFetchRequest());
  return fetch(`${API_BASE_URL}/users/history/motivations`, {
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
    .then(data => dispatch(getUserMotivationsSuccess(data)))
    .catch(err => dispatch(getUserMotivationsError(err)));
};

export const getUserAboutMe = () => (dispatch, getState) => {
  const { authToken } = getState().auth;
  dispatch(userFetchRequest());
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
    .catch(err => dispatch(userFetchError(err)));
};

export const getUserTopHistory = userId => (dispatch, getState) => {
  dispatch(userFetchRequest());
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
    .catch(err => dispatch(userFetchError(err)));
};

export const loadWishList = userId => dispatch => {
  dispatch(userFetchRequest());
  return fetch(`${API_BASE_URL}/users/${userId}/wishList`)
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(userWishListSuccess(res));
    })
    .catch(err => dispatch(userFetchError(err)));
};

export const postUserAboutMe = content => (dispatch, getState) => {
  dispatch(userFetchRequest());

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
      dispatch(postUserAboutMeSuccess(content));
    })
    .catch(err => dispatch(userFetchError(err)));
};

export const getUserHistory = userId => (dispatch, getState) => {
  dispatch(userFetchRequest());

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
    .catch(err => dispatch(userFetchError(err)));
};

export const registerUser = user => () => {
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
      return err;
    });
};

export const getUserSubmotivations = () => (dispatch, getState) => {
  const { authToken } = getState().auth;
  dispatch(userFetchRequest());
  return fetch(`${API_BASE_URL}/users/history/submotivations`, {
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
      dispatch(getUserSubmotivationsSuccess(data));
    })
    .catch(err => dispatch(userFetchError(err)));
};

export const removeFromWishList = id => (dispatch, getState) => {
  console.log(id);
  const { authToken, currentUser } = getState().auth;
  const { id: userId } = currentUser;
  dispatch(userFetchRequest());
  return axios
    .put(
      `${API_BASE_URL}/users/removewishlist`,
      {
        wishListId: id
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    .then(() => dispatch(loadWishList(userId)))
    .then(() => dispatch(userAddWishListSuccess()))
    .catch(err => dispatch(userFetchError(err)));
};

export const updateUser = (userId, gameId) => (dispatch, getState) => {
  const { authToken } = getState().auth;
  const updateObj = { neverPlayed: gameId };
  dispatch(userFetchRequest());
  return fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "content-type": "application/json"
    },
    body: JSON.stringify(updateObj)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => dispatch(fetchGames()))
    .catch(err => dispatch(userFetchError(err)));
};

export const updateUserProfilePic = (userId, profilePic) => (
  dispatch,
  getState
) => {
  const { authToken } = getState().auth;
  const updateObj = { profilePic };

  return fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "content-type": "application/json"
    },
    body: JSON.stringify(updateObj)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(updatePicSuccess(res.profilePic)))
    .catch(err => dispatch(userFetchError(err)));
};

export const handleAddToWishList = id => (dispatch, getState) => {
  const { authToken, currentUser } = getState().auth;
  dispatch(userFetchRequest());
  return axios
    .put(
      `${API_BASE_URL}/users/wishlist`,
      {
        wishListId: id
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    .then(res => {
      return dispatch(loadWishList(currentUser.id)).then(() => {
        dispatch(userAddWishListSuccess());
      });
    })
    .catch(err => dispatch(userFetchError(err)));
};
