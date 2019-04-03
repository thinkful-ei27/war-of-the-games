import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { loadAuthToken } from "./local-storage";
import allGamesReducer from "./reducers/allGamesReducer";
<<<<<<< HEAD
import authReducer from "./reducers/auth";
import gamesReducer from "./reducers/gameReducer";
import protectedDataReducer from "./reducers/protected-data";
import userReducer from "./reducers/userReducer";
import { setAuthToken, refreshAuthToken } from "./actions/auth";
=======
import onBoardingReducer from "./reducers/onBoardingReducer";
import authReducer from "./reducers/auth";
import gamesReducer from "./reducers/gameReducer";
import userReducer from "./reducers/userReducer"
import protectedDataReducer from "./reducers/protected-data";
import { setAuthToken, refreshAuthToken } from "./actions/auth";

>>>>>>> dev

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    protectedData: protectedDataReducer,
    games: gamesReducer,
    allGames: allGamesReducer,
    onboard: onBoardingReducer,
    user: userReducer
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
