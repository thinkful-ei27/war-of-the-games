/* eslint-disable react/destructuring-assignment */
import React from "react";
import { connect } from "react-redux";
import ConnectedCard from "./card";
import { fetchGames, clearGames } from "../actions/gameActions";

export function Battle(props) {
  const { fetchFeedback, dispatch } = props;
  return (
    <div className="battle-container">
      <ConnectedCard
        src={props[0].cloudImage}
        alt={props[0].name}
        name={props[0].name}
        id={props[0].id}
        fetchFeedback={id => fetchFeedback(id)}
      />
      <div className="vs-skip-container">
        <span className="vs">VS</span>
      </div>
      <ConnectedCard
        src={props[1].cloudImage}
        alt={props[1].name}
        name={props[1].name}
        id={props[1].id}
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
