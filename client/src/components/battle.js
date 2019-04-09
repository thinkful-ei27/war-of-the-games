/* eslint-disable react/destructuring-assignment */
import React from "react";
import { connect } from "react-redux";
import ConnectedCard from "./card";
import { fetchGames, clearGames } from "../actions/gameActions";

export function Battle(props) {
  const { fetchFeedback, dispatch, games } = props;
  return (
    <div className="battle-container">
      <ConnectedCard
        game={games[0]}
        src={games[0].cloudImage}
        alt={games[0].name}
        id={games[0].id}
        fetchFeedback={id => fetchFeedback(id)}
      />
      <div className="vs-skip-container">
        <span className="vs">VS</span>
      </div>
      <ConnectedCard
        game={games[1]}
        src={games[1].cloudImage}
        alt={games[1].name}
        id={games[1].id}
        fetchFeedback={id => fetchFeedback(id)}
      />
      <button
        onClick={() => {
          dispatch(clearGames());
          dispatch(fetchGames());
        }}
        className="nes-btn is-primary"
        id="skip-btn"
        type="button"
      >
        Skip
      </button>
    </div>
  );
}

export default connect()(Battle);
