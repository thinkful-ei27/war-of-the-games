import React from "react";

export default function VoteCard(props) {
  const { name, src } = props;

  return (
    <div className="vote-card">
      <span className="vote-card-label" htmlFor={name}>
        {name}
      </span>
      <img className="vote-card-thumb" name={name} src={src} alt={name} />
    </div>
  );
}
