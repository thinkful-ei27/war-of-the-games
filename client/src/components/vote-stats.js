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

  /*
  Once this is dyanmic all you have to do to get it working is change
  gameOne, gameTwo to props[0] and props[1] respectively
  */

  return (
    <div className="vote-stats-container">
      <VoteCard name={name} src={coverUrl} />
      {/* <VoteCard name={gameTwo.name} src={gameTwo.coverUrl} /> */}
      <p className="voting-feedback">
        {`${percent} or users picked ${name} as a winner`}
      </p>
    </div>
  );
}
