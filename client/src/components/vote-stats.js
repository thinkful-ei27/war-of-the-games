import React from "react";
import VoteCard from "./vote-card";

export default function VoteStats(props) {
  return (
    <div className="vote-stats-container">
      <VoteCard name={props[0].name} src={props[0].coverUrl} />
      <VoteCard name={props[1].name} src={props[1].coverUrl} />
      <p>69% of users agree with you!</p>
    </div>
  );
}
