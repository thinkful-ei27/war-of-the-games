import React from "react";
import { Link } from "react-router-dom";

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
  if (screenWidth >= 768) {
    width = "w-1/3";
    fontSize = "text-base";
    padding = "p-6";
  }

  const url = `/games/${slug}`;
  return (
    <div className={`similar-game ${profileWidth || width} ${padding}`}>
      <Link to={url} className="flex flex-col items-center text-center">
        <img
          className="similar m-4"
          src={cloudImage}
          alt={slug}
          data-event={dataEvent}
          data-tip={dataTip}
          data-event-off={dataEventOff}
          data-for={dataFor}
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
