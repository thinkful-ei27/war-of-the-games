import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { loadAuthToken } from "./local-storage";
import allGamesReducer from "./reducers/allGamesReducer";
import authReducer from "./reducers/auth";
import onBoardingReducer from "./reducers/onBoardingReducer";
import gamesReducer from "./reducers/gameReducer";
import progressBarReducer from "./reducers/progressBar";
import userReducer from "./reducers/userReducer";
import windowReducer from "./reducers/window";

import { setAuthToken, refreshAuthToken } from "./actions/auth";

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    auth: authReducer,
    form: formReducer,
    games: gamesReducer,
    allGames: allGamesReducer,
    progressBar: progressBarReducer,
    user: userReducer,
    window: windowReducer,
    onboard: onBoardingReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
