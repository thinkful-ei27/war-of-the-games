import React from "react";
import { connect } from "react-redux";
import { updateGame } from "../../actions/gameActions";
import LongText from "../LongText";
import Logo from "../../assets/favicon3.ico";

export function GameDetails(props) {
  const {
    currentUser,
    dispatch,
    game,
    feedback,
    error,
    loggedIn,
    width
  } = props;
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

  // Mobile Config
  let imgWidth;
  let flexState;
  let title;
  let imgDivMargin;
  let fontSize;
  let contentWidth;
  if (width > 768) {
    // width for img and rating div: w-1/3
    imgWidth = "w-1/3";
    flexState = "flex-row";
    title = <h2>{name}</h2>;
    contentWidth = "w-2/3";
  }
  if (width < 768) {
    // width for img and rating div : w-1
    imgWidth = "w-3/4";
    flexState = "flex-col";
    imgDivMargin = "mx-auto mt-4";
    title = undefined;
    contentWidth = "w-1";
    fontSize = "text-sm";
  }

  return (
    <section className={`flex ${flexState}`}>
      <div className={`${imgWidth} ${imgDivMargin}`}>
        <img
          className="game-info-img p-4 rounded shadow"
          src={cloudImage || coverUrl || Logo}
          alt={slug}
        />
        {renderWinPercentage()}
      </div>
      <div className={`flex flex-col p-4 ${contentWidth} ${fontSize}`}>
        {title}
        <h3 className="mt-8">
          <i className="nes-icon star" />
          Genres
        </h3>
        <p className="">{genreDisplay || "No genres...yet."}</p>
        <h3 className="mt-8">
          <i className="nes-icon star" />
          Platforms
        </h3>
        <p className="">{platformDisplay || "No platforms in database."}</p>
        <div className="my-4">
          <LongText content={summary || "No description...yet."} limit={250} />
        </div>
        {loggedIn && currentUser.admin ? (
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

GameDetails.defaultProps = {
  game: {
    name: "A game has no name",
    coverUrl: "",
    platforms: "No platforms",
    genres: "No genres",
    summary: "Game currently has no summary",
    cloudImage: ""
  }
};

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(GameDetails);
