import React from "react";
import ConnectedGame from "./Game";

export default function GameSimilar(props) {
  const { currentGame } = props;
  const { name } = currentGame;
  const similarGames = currentGame.similar_games;
  const similarDisplay = similarGames.map(vgame => {
    return (
      <ConnectedGame key={vgame.id} slug={vgame.igdb.slug} name={vgame.name} />
    );
  });
  return (
    <section className="mt-16">
      <h3 className="mt-4">
        <i className="nes-icon heart" />
        Games similar to {name}
      </h3>
      <div className="flex justify-start content-start flex-wrap">
        {similarDisplay}
      </div>
    </section>
  );
}
