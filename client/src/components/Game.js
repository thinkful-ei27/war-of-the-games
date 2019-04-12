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
    profileFontSize,
    dataTip,
    dataFor,
    dataEvent,
    dataEventOff
  } = props;
  let width = "w-1/2";
  let fontSize = "text-sm";
  let padding = "p-4";
  let addButton;
  let removeButton;
  if (screenWidth >= 768) {
    width = "w-1/3";
    fontSize = "text-base";
    padding = "p-6";
  }

  // Only show add button if we are on excluded games
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

  // Only show remove button if we are on wishlist page
  if (props.wishList) {
    removeButton = (
      <div className="remove-wishlist-btn-container">
        <button
          onClick={() => props.onRemoveGame(props.id)}
          className="remove-wishlist"
          type="button"
        >
          -
        </button>
      </div>
    );
  }

  const url = `/games/${slug}`;
  return (
    <div className={`similar-game ${profileWidth || width} ${padding}`}>
      {addButton}
      {removeButton}
      <Link to={url} className="flex flex-col items-center text-center">
        <img
          className="similar m-4"
          data-event={dataEvent}
          data-tip={dataTip}
          data-event-off={dataEventOff}
          data-for={dataFor}
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
