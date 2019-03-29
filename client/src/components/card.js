import React from 'react';
import { connect } from 'react-redux';
import {
  fetchGames,
  handleVote,
  clearGames,
  setNonUserVotes,
  clearNonUserVotes
} from '../actions/gameActions';
import { incrementVoteCount } from '../local-storage';

export function Card(props) {
  const {
    src,
    alt,
    name,
    dispatch,
    games,
    id,
    fetchFeedback,
    loggedIn,
    userId
  } = props;
  let handleVoteClick;
  //  if NOT logged in handleVoteclick = add choice object to array in reducer, get new games
  if (loggedIn) {
    console.log('HELLLLLOOO', userId);
    handleVoteClick = () => {
      dispatch(handleVote(games[0].id, games[1].id, id, userId));
      dispatch(fetchGames());
      fetchFeedback(id);
      dispatch(clearNonUserVotes());
      dispatch(clearGames());
    };
  } else {
    handleVoteClick = () => {
      dispatch(setNonUserVotes(games[0].id, games[1].id, id));
      dispatch(fetchGames());
      dispatch(clearGames());
      incrementVoteCount();
    };
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

const checkIfUser = state => {
  if (state.auth.currentUser === null) {
    return 'there is no user';
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
