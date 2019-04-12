import React, { Component } from "react";
import "./styles/gameInfo.css";
import { connect } from "react-redux";
import { fetchCurrentGame } from "../actions/allGames";
import GameHelp from "./GameHelp";
import GameSimilar from "./GameSimilar";
import ConnectedGameDetails from "./GameDetails";
import Page404 from "./404";

export class GameInfo extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { gameSlug } = match.params;
    dispatch(fetchCurrentGame(gameSlug));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, match } = this.props;
    if (prevProps.match.params.gameSlug !== match.params.gameSlug) {
      dispatch(fetchCurrentGame(match.params.gameSlug));
    }
  }

  render() {
    const {
      currentGame,
      currentFeedback,
      error,
      location,
      screenWidth
    } = this.props;
    let content;
    if (error) {
      content = <Page404 />;
      // content = <div>Loading...</div>;
    } else if (!currentGame) {
      content = <div className="loading-screen">Loading...</div>;
    } else {
      content = (
        <>
          <ConnectedGameDetails
            width={screenWidth}
            game={currentGame}
            feedback={currentFeedback}
            error={error}
          />
          <GameHelp game={currentGame} />
          <GameSimilar
            screenWidth={screenWidth}
            currentGame={currentGame}
            location={location}
          />
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
    error: state.allGames.error,
    screenWidth: state.window.width
  };
};

export default connect(mapStateToProps)(GameInfo);
