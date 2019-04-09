/* eslint-disable react/destructuring-assignment */
import React from "react";
import { connect } from "react-redux";
import ReactTooltip from 'react-tooltip'
import ConnectedCard from "./card";
import { fetchGames, clearGames } from "../actions/gameActions";

export function Battle(props) {

  const { fetchFeedback, dispatch } = props;
  return (
    < div className="battle-container" >
      <ConnectedCard
        game={props[0]}
        src={props[0].cloudImage}
        alt={props[0].name}
        id={props[0].id}
        summary={props[0].summary.slice(0, 80).concat('...')}
        fetchFeedback={id => fetchFeedback(id)}
        gameSummaryNum="gameSummaryNum1"
      />
      <div className="vs-skip-container">
        <span className="vs">VS</span>
      </div>
      <ConnectedCard
        game={props[1]}
        src={props[1].cloudImage}
        alt={props[1].name}
        id={props[1].id}
        summary={props[1].summary.slice(0, 80).concat('...')}
        gameSummaryNum="gameSummaryNum2"
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
