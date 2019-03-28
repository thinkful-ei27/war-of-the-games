import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./styles/gameInfo.css";
import { connect } from "react-redux";

export function GameInfo(props) {
  let content;
  const { gameSlug } = props.match.params;
  // const { name, coverUrl, slug } = props;
  const { loading, games } = props;
  if (loading || games.length < 1) {
    content = <div>loading</div>;
  } else {
    const game = games.find(g => g.igdb.slug === gameSlug);
    const { name, coverUrl, slug } = game;
    content = (
      <>
        <div className="flex flex-row">
          <div className="w-1/3 m-4">
            <img
              className="game-info-img p-4 rounded shadow"
              src={coverUrl}
              alt={slug}
            />
            <h3 className="mt-4">Rating: {parseInt(game.total_rating)}</h3>
            <progress
              className="nes-progress is-success"
              value={game.total_rating}
              max="100"
            />
          </div>
          <div className="flex flex-col p-4 w-2/3">
            <h2>{name}</h2>

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
            <span className="nes-text is-primary">{name}</span> needs your help!
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
            Games similar to {name}
          </h3>
          <div className="flex justify-start content-start flex-wrap">
            {/* {similarGames} */}
          </div>
        </section>
      </>
    );
  }

  // const similarGames = related.map(vgame => (
  //   <Game
  //     coverUrl={vgame.coverUrl}
  //     slug={vgame.slug}
  //     name={vgame.name}
  //   />
  // ));
  return <section className="game-container mx-auto">{content}</section>;
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    loading: state.allGames.loading
  };
};

export default connect(mapStateToProps)(GameInfo);
