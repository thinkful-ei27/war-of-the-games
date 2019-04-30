export const NEXT_TEST_SUCCESS = "NEXT_TEST_SUCCESS";
export const nextTestSuccess = payload => ({
  type: NEXT_TEST_SUCCESS,
  payload
});

export const CLEAR_LOADING = "CLEAR_LOADING";
export const clearLoading = () => ({
  type: CLEAR_LOADING
});

export const UDPATE_VOTE_COUNT = "UPDATE_VOTE_COUNT";
export const updateVoteCount = count => ({
  type: UDPATE_VOTE_COUNT,
  count
});
