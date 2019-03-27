import React from "react";
import { connect } from "react-redux";
import { handleVote, fetchGames, incrementSessionCount } from "../actions/gameActions";

export function Card(props) {
  const { src, alt, name, dispatch, games, id } = props;

  function handleVoteClick() {
    dispatch(handleVote(games[0].id, games[1].id, id));
    dispatch(fetchGames());
    dispatch(incrementSessionCount())
  }


  return (
    <div className="card">
      <h1 className="game-title">{name || "Game title"}</h1>
      <img className="game-img" src={src} alt={alt} />
      <button
        id="vote-button"
        className="nes-btn is-warning"
        type="button"
        onClick={() => handleVoteClick()}
      >
        Vote
      </button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    games: state.games.battleGames
  };
};

export default connect(mapStateToProps)(Card);
