import React from "react";

export default function VoteStats(props) {
  const { src, name } = props;

  return (
    <div className="vote-stats-container">
      <label>{name}</label>
      <img src={src} alt={name} />

      <label>{name}</label>
      <img src={src} alt={name} />
      <p>69% of users agree with you!</p>
    </div>
  );
}
