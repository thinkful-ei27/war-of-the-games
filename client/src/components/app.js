import React from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import LoginForm from "./login-form";
import HeaderBar from "./header-bar";
import LandingPage from "./landing-page";
import Page404 from "./404";
import AboutPage from "./about";
import RegistrationPage from "./registration-page";
import { refreshAuthToken } from "../actions/auth";
import GameInfo from "./GameInfo";
import Games from "./Games";
import { ProfilePage } from "./ProfilePage";

export class App extends React.Component {
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
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
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
        <HeaderBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegistrationPage} />
          <Route exact path="/games" component={Games} />
          <Route path="/games/:gameSlug" component={GameInfo} />
          <Route component={Page404} />
        </Switch>
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
