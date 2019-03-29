import React from "react";

export default function VoteCard(props) {
  const { name, src, percent } = props;

  return (
    <div className="vote-card">
      <img className="vote-card-thumb" name={name} src={src} alt={name} />
      <p className="voting-feedback">
        {`${name} has won ${percent}% of all battles`}
      </p>
    </div>
  );
}
