/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import Card from "./card";
import { SignupPrompt } from './signupPrompt'
import "./styles/card.css";
import { fetchGames } from "../actions/gameActions";
import { loadVoteCount, setVoteLocalStorageVariable } from '../local-storage'
export class LandingPage extends React.Component {

  componentDidMount() {
    setVoteLocalStorageVariable();
    const { dispatch } = this.props;
    dispatch(fetchGames());
  }

  render() {
    const { games, loggedIn } = this.props;
    let count = parseInt(loadVoteCount());
    let content;
    if (count >= 5 && !loggedIn) {
      content = (
        <SignupPrompt />
      );
    }
    else if (games.length) {
      content = (
        <div className="battle-container">
          <Card
            src={games[0].coverUrl}
            alt={games[0].name}
            name={games[0].name}
            id={games[0].id}
          />
          <span className="vs">VS</span>
          <Card
            src={games[1].coverUrl}
            alt={games[1].name}
            name={games[1].name}
            id={games[1].id}
          />
        </div>
      );
    } else {
      content = <div className="landing-page-loader">loading...</div>;
    }

    return content;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  games: state.games.battleGames,
  count: state.games.sessionVoteCount
});

export default connect(mapStateToProps)(LandingPage);
