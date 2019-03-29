import React from "react";
import { Link } from "react-router-dom";
import "./styles/gameInfo.css";
import { connect } from "react-redux";
import Game from "./Game";

export function GameInfo(props) {
  let content;
  const { gameSlug } = props.match.params;
  const { loading, games, feedback, error } = props;
  if (loading || games.length < 1) {
    content = <div>loading</div>;
  } else {
    const game = games.find(g => g.igdb.slug === gameSlug);
    const {
      name,
      coverUrl,
      slug,
      platforms,
      genres,
      summary,
      similar_games
    } = game;
    let percentage = !feedback ? "No ratings yet" : feedback.percentage;
    percentage *= 100;
    const genreDisplay = genres.map(gen => <span>{gen.name}, </span>);
    const platformDisplay = platforms.map(plat => <span>{plat.name}, </span>);
    const similarDisplay = similar_games.map(ident => {
      const vgame = games.find(g => g.igdb.id === ident);
      if (!vgame) return;
      return <Game slug={vgame.igdb.slug} name={vgame.name} />;
    });
    content = (
      <>
        <div className="flex flex-row">
          <div className="w-1/3 m-4">
            <img
              className="game-info-img p-4 rounded shadow"
              src={coverUrl}
              alt={slug}
            />
            <h3 className="mt-4">
              Rating: {error ? "No ratings yet" : parseInt(percentage)}
            </h3>
            <progress
              className="nes-progress is-success"
              value={percentage}
              max="100"
            />
          </div>
          <div className="flex flex-col p-4 w-2/3">
            <h2>{name}</h2>

            <h3 className="mt-4">
              <i className="nes-icon star" />
              Genres
            </h3>
            <p className="">{genreDisplay}</p>
            <h3 className="mt-4">
              <i className="nes-icon star" />
              Platforms
            </h3>
            <p className="">{platformDisplay}</p>
            <p className="mt-4">{summary}</p>
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
            {similarDisplay}
          </div>
        </section>
      </>
    );
  }
  return <section className="game-container mx-auto">{content}</section>;
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    loading: state.allGames.loading,
    feedback: state.games.feedback,
    error: state.games.error
  };
};

export default connect(mapStateToProps)(GameInfo);
