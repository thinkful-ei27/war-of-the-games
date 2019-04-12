/* eslint-disable no-undef */
import React from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import LoginForm from "./login-form";
import ConnectedHeaderBar from "./header-bar";
import ConnectedLandingPage from "./landing-page";
import Page404 from "./404";
import ConnectedAboutPage from "./about";
import ConnectedRegistrationPage from "./registration-page";
import { refreshAuthToken } from "../actions/auth";
import Stats from "./Stats";
import ProfilePage from "./ProfilePage";
import { windowSize } from "../actions/window";
import ConnectedProfilePage from "./ProfilePage";
import ConnectedGameInfo from "./GameInfo";
import ConnectedGames from "./Games";
import ConnectedFooter from "./footer";
import ConnectedRecommendationsPage from "./RecommendationsPage";
import ConnectedWishListPage from "./WishListPage";
import ErrorBoundary from "./errorBoundary";
import Leaderboard from "./Leaderboard";
import "./styles/app.css";

export class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    // get dimensions on page load
    let width = window.document.documentElement.clientWidth;
    let height = window.document.documentElement.clientHeight;
    dispatch(windowSize(width, height));

    window.addEventListener("resize", e => {
      width = e.currentTarget.document.body.clientWidth;
      height = e.currentTarget.document.body.clientHeight;
      dispatch(windowSize(width, height));
    });
  }

  componentDidUpdate(prevProps) {
    const { loggedIn } = this.props;
    if (!prevProps.loggedIn && loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
    window.removeEventListener("resize");
  }

  startPeriodicRefresh() {
    const { dispatch } = this.props;
    this.refreshInterval = setInterval(
      () => dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <ConnectedHeaderBar />
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={ConnectedLandingPage} />
            <Route exact path="/profile" component={ConnectedProfilePage} />
            <Route
              path="/profile/recommendations"
              component={ConnectedRecommendationsPage}
            />
            <Route path="/about" component={ConnectedAboutPage} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={ConnectedRegistrationPage} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/stats" component={Stats} />
            <Route exact path="/games" component={ConnectedGames} />
            <Route path="/games/:gameSlug" component={ConnectedGameInfo} />
            <Route
              path="/users/:username/wishlist"
              component={ConnectedWishListPage}
            />
            <Route component={Page404} />
          </Switch>
        </ErrorBoundary>
        <ConnectedFooter />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
  games: state.allGames.games
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
