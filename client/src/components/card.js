import React from "react";
import { connect } from "react-redux";
import { handleVote } from '../actions/gameActions'

export function Card(props) {
  const { src, alt, title, dispatch, games } = props;

  function handleVoteClick() {
    dispatch(handleVote(games[0].title, games[1].title, title));
  }

  return (
    <div className="card">
      <h1 className="game-title">{title || "Game title"}</h1>
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
