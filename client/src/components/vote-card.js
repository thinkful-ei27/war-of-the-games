import React from "react";

export default function VoteCard(props) {
  const { name, src } = props;

  return (
    <div className="vote-card">
      <img className="vote-card-thumb" name={name} src={src} alt={name} />
    </div>
  );
}
