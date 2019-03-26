import React from "react";

export default function Card(props) {
  const { src, alt, title } = props;
  return (
    <div className="card">
      <h1 className="game-title">{title || "Game title"}</h1>
      <img className="game-img" src={src} alt={alt} />
      <button id="vote-button" className="nes-btn is-warning" type="button">
        Vote
      </button>
    </div>
  );
}
