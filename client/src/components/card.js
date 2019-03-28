import React from "react";
import { connect } from "react-redux";
import { fetchGames, handleVote } from "../actions/gameActions";
import { incrementVoteCount } from '../local-storage';

export function Card(props) {
  const { src, alt, name, dispatch, games, id } = props;

  function handleVoteClick() {
    dispatch(handleVote(games[0].id, games[1].id, id));
    dispatch(fetchGames());
    incrementVoteCount();
  }

  return (
    <div className="card">
      <h1 className="game-title">{name}</h1>
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
