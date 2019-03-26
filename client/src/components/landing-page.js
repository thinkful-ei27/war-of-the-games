/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Card from "./card";

import LoginForm from "./login-form";

export class LandingPage extends React.Component {
  // If we are logged in redirect straight to the user's dashboard

  // <div className="home">
  render() {
    const { games } = this.props;
    console.log(games);
    return (
      //     <h2>Welcome to Foo App</h2>
      //     <LoginForm />
      //     <Link to="/register">Register</Link>
      // </div>
      <div className="battle-container">
        <Card src={games[0].src} alt={games[0].title} title={games[0].title} />
        <span className="vs">VS</span>
        <Card src={games[1].src} alt={games[1].title} title={games[1].title} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  games: state.games.battleGames
});

export default connect(mapStateToProps)(LandingPage);
