import React from "react";
import ConnectedGame from "./Game";

export default function GameSimilar(props) {
  const { currentGame, location, screenWidth } = props;
  const { name } = currentGame;
  const similarGames = currentGame.similar_games;
  const renderSimilarGames = games => {
    return games.map(vgame => {
      return (
        <ConnectedGame
          screenWidth={screenWidth}
          key={vgame.id}
          location={location}
          slug={vgame.igdb.slug}
          name={vgame.name}
          cloudImage={vgame.cloudImage}
        />
      );
    });
  };
  return (
    <section className="mt-16 p-4">
      <h3 className="mt-4 text-center">
        <i className="nes-icon heart" />
        Games similar to {name}
      </h3>
      <div className="flex justify-start content-start flex-wrap">
        {similarGames.length
          ? renderSimilarGames(similarGames)
          : "There are no similar games currently in our database"}
      </div>
    </section>
  );
}
