import {
  GET_USER_SUCCESS,
  GET_USER_TOP_HISTORY_SUCCESS,
  POST_USER_ABOUT_ME_SUCCESS,
  GET_USER_ABOUT_ME_SUCCESS,
  GET_USER_SUBMOTIVATIONS_SUCCESS,
  USER_FETCH_REQUEST,
  USER_FETCH_ERROR,
  GET_USER_MOTIVATIONS_SUCCESS
} from "../actions/users";

const initialState = {
  history: [],
  topHistory: [],
  motivations: [],
  subMotivations: "",
  aboutMe: "",
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        history: [...action.history],
        loading: false
      };
    case GET_USER_TOP_HISTORY_SUCCESS:
      return {
        ...state,
        topHistory: [...action.history]
      };
    case POST_USER_ABOUT_ME_SUCCESS:
      return {
        ...state,
        aboutMe: action.content,
        loading: false
      };
    case GET_USER_ABOUT_ME_SUCCESS:
      return { ...state, aboutMe: action.content };
    case GET_USER_MOTIVATIONS_SUCCESS:
      return {
        ...state,
        motivations: [...action.data.percentages],
        loading: false
      };
    case GET_USER_SUBMOTIVATIONS_SUCCESS:
      return {
        ...state,
        subMotivations: action.content.choicePercentages
      };
    case USER_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case USER_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
