import React from "react";
import { Link } from "react-router-dom";
import "./styles/gameInfo.css";
import GameSimilar from "./GameSimilar";

export default function GameInfo(props) {
  const { gameSlug } = props.match.params;
  console.log(gameSlug);
  const game = {
    id: 1074,
    category: 0,
    collection: 240,
    cover: 1060,
    created_at: 1339200000,
    first_release_date: 835488000,
    name: "Super Mario 64",
    slug: "super-mario-64",
    summary:
      "Mario is invited by Princess Peach to her castle, but once he arrives he finds out that Bowser has kidnapped her. Mario has to overcome many challenges and collect Power Stars hidden in the castle's paintings and walls to defeat Bowser and rescue Peach in this seminal 3D platformer.",
    total_rating: 89.50511815582911,
    total_rating_count: 635,
    url: "https://www.igdb.com/games/super-mario-64",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_720p/scutr4p9gytl4txb2soy.jpg"
  };
  const related = [
    {
      name: "The Legend of Zelda",
      igdb: {
        id: 1022,
        slug: "the-legend-of-zelda"
      },
      coverUrl:
        "https://images.igdb.com/igdb/image/upload/t_720p/bfeef9eun1ybhuwufqxm.jpg"
    },
    {
      name: "Mortal Kombat",
      igdb: {
        id: 1618,
        slug: "mortal-kombat--2"
      },
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hno.jpg"
    },
    {
      name: "Street Fighter II",
      igdb: {
        id: 3186,
        slug: "street-fighter-ii"
      },
      coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hq8.jpg"
    },
    {
      name: "Halo: Combat Evolved",
      igdb: {
        id: 740,
        slug: "halo-combat-evolved"
      },
      coverUrl:
        "https://images.igdb.com/igdb/image/upload/t_720p/bcotwv6rapvdglcahxi3.jpg"
    }
  ];

  const found = related.find(g => g.igdb.slug === gameSlug);
  console.log(found);

  const similarGames = related.map(vgame => (
    <GameSimilar
      coverUrl={vgame.coverUrl}
      slug={vgame.slug}
      name={vgame.name}
    />
  ));
  return (
    <section className="game-container mx-auto">
      <div className="flex flex-row">
        <div className="w-1/3 m-4">
          <img
            className="game-info-img p-4 rounded shadow"
            src={found.coverUrl}
            alt={found.slug}
          />
          <h3 className="mt-4">Rating: {parseInt(game.total_rating)}</h3>
          <progress
            className="nes-progress is-success"
            value={game.total_rating}
            max="100"
          />
        </div>
        <div className="flex flex-col p-4 w-2/3">
          <h2>{found.name}</h2>

          <h3 className="mt-4">
            <i className="nes-icon star" />
            Genre and Tags
          </h3>
          <p className="">Action, Loot, Adventure...</p>
          <h3 className="mt-4">
            <i className="nes-icon star" />
            Platforms
          </h3>
          <p className="">Nintendo 64</p>
          <p className="mt-4">{game.summary}</p>
        </div>
      </div>
      <div className="nes-container with-title is-centered mt-16">
        <p className="title">
          <span className="nes-text is-primary">{found.name}</span> needs your
          help!
        </p>
        <Link to="/">
          <button type="button" className="nes-btn is-primary">
            Vote now!
          </button>
        </Link>
      </div>
      <section className="mt-16">
        <h3 className="mt-4">
          <i className="nes-icon heart" />
          Games similar to {found.name}
        </h3>
        <div className="flex justify-start content-start flex-wrap">
          {similarGames}
        </div>
      </section>
    </section>
  );
}
