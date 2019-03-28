import React from "react";
import { Link } from "react-router-dom";

export default function Game(props) {
  const { coverUrl, slug, name } = props;
  const url = `/games/${slug}`;
  return (
    <div className="similar-game w-1/3 p-4">
      <Link to={url} className="flex flex-col items-center text-center">
        {/* <img className="similar m-4" src={coverUrl} alt={slug} /> */}
        <i className="nes-mario" />
        <p>
          <span className="nes-text is-primary">{name}</span>
        </p>
      </Link>
    </div>
  );
}
