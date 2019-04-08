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
        src={props[0].cloudImage}
        alt={props[0].name}
        name={props[0].name}
        id={props[0].id}
        summary={props[0].summary.slice(0, 80)}
        fetchFeedback={id => fetchFeedback(id)}
        gameSummaryNum="gameSummaryNum1"
      />
      <div className="vs-skip-container">
        <span className="vs">VS</span>
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
      <ConnectedCard
        src={props[1].cloudImage}
        alt={props[1].name}
        name={props[1].name}
        id={props[1].id}
        summary={props[1].summary.slice(0, 80)}
        gameSummaryNum="gameSummaryNum2"
        fetchFeedback={id => fetchFeedback(id)}
      />
    </div >
  );
}

export default connect()(Battle);
