import React from "react";
import ConnectedGame from "./gamePage/Game";

export default function ExcludedGames(props) {
  const { excludedGames, screenWidth, onRemoveExcluded } = props;
  const games = excludedGames.map(game => {
    const { id, name, cloudImage, igdb, slug, cover } = game;
    let coverUrl;
    if (cover) {
      const { image_id: imageId } = cover;
      coverUrl = imageId
        ? `https://images.igdb.com/igdb/image/upload/t_720p/${imageId}.jpg`
        : null;
    }
    const props = {
      name,
      cloudImage,
      igdb,
      slug,
      screenWidth,
      onRemoveExcluded,
      coverUrl,
      id,
      excluded: true
    };
    return <ConnectedGame key={props.id} {...props} />;
  });
  if (!excludedGames.length) {
    return null;
  }
  return (
    <div className="mt-16">
      <h2>Excluded Games</h2>
      <div className="game-container flex justify-start content-start flex-wrap">
        {games}
      </div>
    </div>
  );
}
