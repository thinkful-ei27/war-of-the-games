import React from "react";
import VoteCard from "./vote-card";
import "./styles/vote-stats.css";

export default function VoteStats(props) {
  return (
    <div className="vote-stats-container">
      <VoteCard name={props[0].name} src={props[0].coverUrl} />
      <VoteCard name={props[1].name} src={props[1].coverUrl} />
      <p className="voting-feedback">YOU FOOL!</p>
    </div>
  );
}
