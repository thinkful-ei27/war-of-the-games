import React from "react";
import ConnectedGame from "./Game";

export default function ExcludedGames(props) {
  const { excludedGames, screenWidth, onRemoveExcluded } = props;
  const games = excludedGames.map(game => {
    const { id, name, cloudImage, igdb } = game;
    const { slug } = igdb;
    const props = {
      id,
      name,
      cloudImage,
      igdb,
      slug,
      screenWidth,
      onRemoveExcluded,
      excluded: true
    };
    return <ConnectedGame key={props.id} {...props} />;
  });
  if (!excludedGames.length) {
    return null;
  }
  return (
    <div className="mt-16 text-center game-container">
      <h2>Excluded Games</h2>
      {games}
    </div>
  );
}
