import React from "react";
import { Link } from "react-router-dom";

export default function Game(props) {
  const { slug, name, cloudImage, screenWidth } = props;

  let width;
  let fontSize;
  let padding;
  if (screenWidth > 700) {
    width = "w-1/3";
    fontSize = "text-base";
    padding = "p-6";
  }
  if (screenWidth < 700) {
    width = "w-1/2";
    fontSize = "text-sm";
    padding = "p-4";
  }

  const url = `/games/${slug}`;
  return (
    <div className={`similar-game ${width} ${padding}`}>
      <Link to={url} className="flex flex-col items-center text-center">
        <img className="similar m-4" src={cloudImage} alt={slug} />
        {/* <i className="nes-mario" /> */}
        <p>
          <span className={`${fontSize} is-primary`}>{name}</span>
        </p>
      </Link>
    </div>
  );
}
