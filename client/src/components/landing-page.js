/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import Card from "./card";
import "./styles/card.css";
import { fetchGames } from "../actions/gameActions";

export class LandingPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGames());
  }

  render() {
    const { games } = this.props;
    let content;
    if (games.length) {
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
      content = <div>loading...</div>;
    }

    return content;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  games: state.games.battleGames
});

export default connect(mapStateToProps)(LandingPage);
