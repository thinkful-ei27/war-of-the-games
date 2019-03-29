import React from "react";
import Game from "./Game";

export default function GameSimilar(props) {
  const { currentGame } = props;
  const { name, similar_games } = currentGame;
  const similarDisplay = similar_games.map(vgame => {
    console.log("vgame is ", vgame);
    return <Game slug={vgame.igdb.slug} name={vgame.name} />;
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
