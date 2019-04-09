import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/favicon3.ico";

export default function Game(props) {
  const {
    slug,
    name,
    cloudImage,
    screenWidth,
    profileWidth,
    profileFontSize
  } = props;
  let width = "w-1/2";
  let fontSize = "text-sm";
  let padding = "p-4";
  let addButton;
  if (screenWidth >= 768) {
    width = "w-1/3";
    fontSize = "text-base";
    padding = "p-6";
  }
  if (props.excluded) {
    addButton = (
      <button
        onClick={() => props.onRemoveExcluded(props.id)}
        className="add-excluded"
        type="button"
      >
        +
      </button>
    );
  }

  const url = `/games/${slug}`;
  return (
    <div className={`similar-game ${profileWidth || width} ${padding}`}>
      {addButton}
      <Link to={url} className="flex flex-col items-center text-center">
        <img
          className="similar m-4"
          src={cloudImage || props.coverUrl || Logo}
          alt={slug}
        />
        {/* <i className="nes-mario" /> */}
        <p>
          <span className={`${profileFontSize || fontSize} is-primary`}>
            {name}
          </span>
        </p>
      </Link>
    </div>
  );
}
