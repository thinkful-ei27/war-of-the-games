import React from "react";

export default function Card(props) {
  const { src, alt, title } = props;
  return (
    <div className="card">
      <h1 className="game-title">{title || "Game title"}</h1>
      <div>
        <img className="game-img" src={src} alt={alt} />
      </div>
      <button className="nes-btn is-warning" type="button">
        Vote
      </button>
    </div>
  );
}
