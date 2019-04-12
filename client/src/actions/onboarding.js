export const NEXT_TEST_REQUEST = "NEXT_TEST_REQUEST";

export const nextTestRequest = (payload) => ({
  type: NEXT_TEST_REQUEST,
  payload
})

export const NEXT_TEST_SUCCESS = "NEXT_TEST_SUCCESS";

export const nextTestSuccess = (payload) => ({
  type: NEXT_TEST_SUCCESS,
  payload
})

export const SET_LOADING = "SET_LOADING";

export const CLEAR_LOADING = "CLEAR_LOADING";

export const setLoading = () => ({
  type: SET_LOADING
});

export const clearLoading = () => ({
  type: CLEAR_LOADING
});