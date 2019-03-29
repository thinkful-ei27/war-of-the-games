import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchFeedback } from "../actions/gameActions";

export function Game(props) {
  const { coverUrl, slug, name, id } = props;
  const url = `/games/${slug}`;
  const feedback = () => {
    props.dispatch(fetchFeedback(id));
  };
  return (
    <div className="similar-game w-1/3 p-4">
      <Link
        to={url}
        className="flex flex-col items-center text-center"
        onClick={feedback}
      >
        {/* <img className="similar m-4" src={coverUrl} alt={slug} /> */}
        <i className="nes-mario" />
        <p>
          <span className="nes-text is-primary">{name}</span>
        </p>
      </Link>
    </div>
  );
}

export default connect()(Game);
