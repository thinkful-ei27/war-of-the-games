import React from "react";
import { connect } from "react-redux";
import { fetchGames, handleVote, clearGames } from "../actions/gameActions";
import { incrementVoteCount } from "../local-storage";
import { Link } from 'react-router-dom'
// str.toLowerCase().replace(/[^A-Z0-9]+/ig, "-") slug builder 
export function Card(props) {
  const { src, alt, name, dispatch, games, id, fetchFeedback } = props;

  function handleVoteClick() {
    dispatch(handleVote(games[0].id, games[1].id, id));
    dispatch(fetchGames());
    fetchFeedback(id);
    incrementVoteCount();
    dispatch(clearGames());
  }
  let slug = "/games/" + name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-");

  return (
    <div className="card">
      <div className="title-container">
        <Link to={slug}>
          <h1 className="game-title">{name}</h1>
        </Link>
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
