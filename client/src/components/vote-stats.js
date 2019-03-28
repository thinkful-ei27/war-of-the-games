import React from "react";
import VoteCard from "./vote-card";
import "./styles/vote-stats.css";

export default function VoteStats(props) {
  const dummyData = {
    name: "Street Fighter II",
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg",
    percent: "69%"
  };
  const { feedback } = props;
  const { name, coverUrl, percent } = dummyData;
  const { data } = feedback;
  // const { percentage } = data;

  return (
    <div className="vote-stats-container">
      <VoteCard name={name} src={coverUrl} />
      {/* <VoteCard name={gameTwo.name} src={gameTwo.coverUrl} /> */}
      <p className="voting-feedback">
        {`${name} has won ${percent} of all battles`}
      </p>
    </div>
  );
}
