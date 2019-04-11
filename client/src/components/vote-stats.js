import React from "react";
import VoteCard from "./vote-card";
import "./styles/vote-stats.css";

export default function VoteStats(props) {
  const { feedback } = props;
  const { percentage, name, coverUrl, cloudImage } = feedback;

  const percent = parseInt(Number(percentage) * 100, 10);

  return (
    <div className="vote-stats-container shadow">
      <VoteCard src={cloudImage || coverUrl} percent={percent} name={name} />
    </div>
  );
}
