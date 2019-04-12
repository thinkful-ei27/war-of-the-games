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
