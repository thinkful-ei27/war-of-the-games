import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchGames,
  handleVote,
  clearGames,
  clearNonUserVotes
} from "../actions/gameActions";

export function Card(props) {
  const { src, alt, name, dispatch, games, id, fetchFeedback, userId } = props;

  const handleVoteClick = () => {
    dispatch(handleVote(games[0].id, games[1].id, id, userId));
    dispatch(fetchGames());
    fetchFeedback(id);
    dispatch(clearNonUserVotes());
    dispatch(clearGames());
  };

  const gamesUrl = "/games/";
  const slug =
    name.charAt(name.length - 1) === "."
      ? // check to see if the last character is a period, which a few games do have, which would break the link
        // if period is found, remove it and build slug with that e.g Super Smash Bros. becomes super-smash-bros
        name
          .substring(0, name.length - 1)
          .toLowerCase()
          .replace(/[^A-Z0-9]+/gi, "-")
      : name.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

  return (
    <div className="card">
      <div className="title-container">
        <Link to={gamesUrl + slug} target="_blank">
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

const checkIfUser = state => {
  if (state.auth.currentUser === null) {
    return "there is no user";
  }
  return state.auth.currentUser.id;
};

const mapStateToProps = state => {
  return {
    games: state.games.battleGames,
    loggedIn: state.auth.currentUser !== null,
    userId: checkIfUser(state)
  };
};

export default connect(mapStateToProps)(Card);
