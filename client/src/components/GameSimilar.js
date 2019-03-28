import React from "react";
import { Link } from "react-router-dom";

export default function GameSimilar(props) {
  const { coverUrl, slug, name } = props;
  return (
    <div className="similar-game w-1/3 p-4">
      <Link to="/" className="flex flex-col items-center text-center">
        <img className="similar m-4" src={coverUrl} alt={slug} />
        <p>
          <span className="nes-text is-primary">{name}</span>
        </p>
      </Link>
    </div>
  );
}
