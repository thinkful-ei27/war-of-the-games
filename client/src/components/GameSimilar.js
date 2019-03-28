import React from "react";
import { Link } from "react-router-dom";

export default function GameSimilar(props) {
  const { coverUrl, title, slug, name } = props;
  return (
    <div className="similar-game w-1/3 p-4">
      <Link to="/" className="flex flex-col items-center">
        <img className="similar m-4" src={coverUrl} alt={slug} />
        <p>
          <span className="nes-text is-primary">{title}</span>
          {name}
        </p>
      </Link>
    </div>
  );
}
