import React from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import LoginForm from "./login-form";
import ConnectedHeaderBar from "./header-bar";
import ConnectedLandingPage from "./landing-page";
import ConnectedDashboard from "./dashboard";
import Page404 from "./404";
import AboutPage from "./about";
import ConnectedRegistrationPage from "./registration-page";
import { refreshAuthToken } from "../actions/auth";
<<<<<<< HEAD
import GameInfo from "./GameInfo";
import Games from "./Games";
import Stats from "./Stats";
=======
import ConnectedGameInfo from "./GameInfo";
import ConnectedGames from "./Games";
>>>>>>> dev

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
        <Switch>
          <Route exact path="/" component={ConnectedLandingPage} />
          <Route path="/dashboard" component={ConnectedDashboard} />
          <Route path="/about" component={AboutPage} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/stats" component={Stats} />
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
