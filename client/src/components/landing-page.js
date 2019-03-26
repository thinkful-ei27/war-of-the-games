/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import Card from "./card";
import "./styles/card.css";

export class LandingPage extends React.Component {
  render() {
    const { games } = this.props;
    return (
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
