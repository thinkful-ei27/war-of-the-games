import React from "react";
import { connect } from "react-redux";
import { fetchGames, handleVote, clearGames } from "../actions/gameActions";
import { incrementVoteCount } from "../local-storage";

export function Card(props) {
  const { src, alt, name, dispatch, games, id, fetchFeedback } = props;

  function handleVoteClick() {
    dispatch(handleVote(games[0].id, games[1].id, id));
    dispatch(fetchGames());
    fetchFeedback(id);
    incrementVoteCount();
    dispatch(clearGames());
  }

  return (
    <div className="card">
      <div className="title-container">
        <h1 className="game-title">{name}</h1>
      </div>
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
