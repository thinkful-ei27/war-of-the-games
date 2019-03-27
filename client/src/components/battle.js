/* eslint-disable react/destructuring-assignment */
import React from "react";
import Card from "./card";

export default function Battle(props) {
  return (
    <div className="battle-container">
      <Card
        src={props[0].coverUrl}
        alt={props[0].name}
        name={props[0].name}
        id={props[0].id}
      />
      <span className="vs">VS</span>
      <Card
        src={props[1].coverUrl}
        alt={props[1].name}
        name={props[1].name}
        id={props[1].id}
      />
    </div>
  );
}
