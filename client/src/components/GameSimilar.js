import React from "react";
import ConnectedGame from "./Game";

export default function GameSimilar(props) {
  const { currentGame, location } = props;
  const { name } = currentGame;
  const similarGames = currentGame.similar_games;
  const renderSimilarGames = games => {
    return games.map(vgame => {
      return (
        <ConnectedGame
          key={vgame.id}
          location={location}
          slug={vgame.igdb.slug}
          name={vgame.name}
        />
      );
    });
  };
  return (
    <section className="mt-16">
      <h3 className="mt-4">
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
