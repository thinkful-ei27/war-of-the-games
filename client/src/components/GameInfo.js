import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/gameInfo.css";
import { connect } from "react-redux";
import { fetchCurrentGame } from "../actions/allGames";
import Game from "./Game";
import GameHelp from "./GameHelp";
import GameSimilar from "./GameSimilar";
import GameDetails from "./GameDetails";
import Page404 from "./404";

export class GameInfo extends Component {
  componentDidMount() {
    const { gameSlug } = this.props.match.params;
    this.props.fetchCurrentGame(gameSlug);
  }

  render() {
    const { currentGame, currentFeedback, error } = this.props;
    let content;
    if (error) {
      content = <Page404 />;
      // content = <div>Loading...</div>;
    } else if (!currentGame) {
      content = <div>Loading...</div>;
    } else {
      content = (
        <>
          <GameDetails
            game={currentGame}
            feedback={currentFeedback}
            error={error}
          />
          <GameHelp game={currentGame} />
          {/* <GameSimilar games={games} /> */}
        </>
      );
    }
    return <section className="game-container mx-auto">{content}</section>;
  }
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    currentGame: state.allGames.currentGame,
    loading: state.allGames.loading,
    currentFeedback: state.allGames.currentFeedback,
    error: state.allGames.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentGame: slug => dispatch(fetchCurrentGame(slug))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameInfo);
