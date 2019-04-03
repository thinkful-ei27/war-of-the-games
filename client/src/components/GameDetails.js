import React from "react";
import { connect } from "react-redux";
import { updateGame } from "../actions/gameActions";
import LongText from "./LongText";

export function GameDetails(props) {
  const { dispatch, game, feedback, error, loggedIn } = props;
  const { name, coverUrl, slug, platforms, genres, summary, cloudImage } = game;
  let platformDisplay;
  const genreDisplay = genres.map(gen => (
    <span key={gen.id}>{gen.name}, </span>
  ));
  if (platforms) {
    platformDisplay = platforms.map(plat => (
      <span key={plat.id}>{plat.name}, </span>
    ));
  }

  const renderWinPercentage = () => {
    if (feedback) {
      let { percentage } = feedback;
      percentage *= 100;
      return (
        <section>
          <h3 className="mt-4">
            Rating: {error ? "No ratings yet" : parseInt(percentage, 10)}
          </h3>
          <progress
            className="nes-progress is-success"
            value={percentage}
            max="100"
          />
        </section>
      );
    }
    return <p>No ratings yet</p>;
  };

  return (
    <section className="flex flex-row">
      <div className="w-1/3 m-4">
        <img
          className="game-info-img p-4 rounded shadow"
          src={cloudImage || coverUrl}
          alt={slug}
        />
        {renderWinPercentage()}
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
        <LongText content={summary} limit={250} />
        {loggedIn ? (
          <small>
            Is this game missing some info? Try{" "}
            <button type="button" onClick={() => dispatch(updateGame(game))}>
              refreshing the data
            </button>
            .
          </small>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(GameDetails);
