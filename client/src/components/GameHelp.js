import React from "react";
import { Link } from "react-router-dom";

export default function GameHelp(props) {
  const { game } = props;
  const { name } = game;
  return (
    <div className="nes-container with-title is-centered mt-16">
      <p className="title">
        <span className="nes-text is-primary">{name}</span> needs your help!
      </p>
      <Link to="/">
        <button type="button" className="nes-btn is-primary">
          Vote now!
        </button>
      </Link>
    </div>
  );
}