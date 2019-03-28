import React from "react";
import VoteCard from "./vote-card";
import "./styles/vote-stats.css";

export default function VoteStats(props) {
  const { feedback } = props;
  const { percentage, name, coverUrl } = feedback;

  const percent = parseInt(Number(percentage) * 100, 10);

  return (
    <div className="vote-stats-container">
      <VoteCard name={name} src={coverUrl} />
      <p className="voting-feedback">
        {`${name} has won ${percent}% of all battles`}
      </p>
    </div>
  );
}
