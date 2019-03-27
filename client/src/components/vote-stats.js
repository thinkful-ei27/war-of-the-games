import React from "react";
import VoteCard from "./vote-card";
import "./styles/vote-stats.css";

export default function VoteStats(props) {
  const dummyData = {
    gameOne: {
      name: "Street Fighter II",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg"
    },
    gameTwo: {
      name: "Mortal Kombat",
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hno.jpg"
    }
  };
  const { feedback } = props;
  const { gameOne, gameTwo } = dummyData;

  /*
  Once this is dyanmic all you have to do to get it working is change
  gameOne, gameTwo to props[0] and props[1] respectively
  */

  return (
    <div className="vote-stats-container">
      <VoteCard name={gameOne.name} src={gameOne.coverUrl} />
      <VoteCard name={gameTwo.name} src={gameTwo.coverUrl} />
      <p className="voting-feedback">{feedback}</p>
    </div>
  );
}
