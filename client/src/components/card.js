import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import SummaryComponent from "./summaryComponent";
import Modal from "./Modal";
import {
  fetchGames,
  handleVote,
  clearGames,
  clearNonUserVotes
} from "../actions/gameActions";
import { updateUser } from "../actions/users";

export class Card extends Component {
  state = {
    showModal: false
  };

  handleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  handleNeverPlayedClick(gameId) {
    const { dispatch, userId } = this.props;
    dispatch(updateUser(userId, gameId));
    this.handleModal();
  }

  handleVoteClick() {
    const { dispatch, games, id, fetchFeedback, userId } = this.props;
    dispatch(handleVote(games[0].id, games[1].id, id, userId));
    dispatch(fetchGames());
    fetchFeedback(id);
    dispatch(clearNonUserVotes());
    dispatch(clearGames());
  }

  render() {
    const {
      game,
      src,
      alt,
      id,
      loggedIn,
      summary,
      gameSummaryNum
    } = this.props;
    const { name } = game;
    const { showModal } = this.state;
    const gamesUrl = "/games/";
    const slug =
      name.charAt(name.length - 1) === "."
        ? // check to see if the last character is a period, which a few games do have, which would break the link
          // if period is found, remove it and build slug with that e.g Super Smash Bros. becomes super-smash-bros
          name
            .substring(0, name.length - 1)
            .toLowerCase()
            .replace(/[^A-Z0-9]+/gi, "-")
        : name.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

    return (
      <div className="card">
        <Modal
          item="battles? This can not be undone."
          showModal={showModal}
          onRemove={gameId => this.handleNeverPlayedClick(gameId)}
          handleModal={() => this.handleModal()}
          id={id}
        />
        <div className="title-container">
          <Link to={gamesUrl + slug} target="_blank">
            <h1 className="game-title">{name}</h1>
          </Link>
        </div>
        <ReactTooltip
          className="hover"
          id={gameSummaryNum}
          type="info"
          multiline
          effect="float"
          clickable
          delayShow={80}
        >
          <Link to={gamesUrl + slug} target="_blank">
            <p style={{ fontSize: "10px", color: "white", fontWeight: "bold" }}>
              {name}
            </p>
          </Link>
          <span className="hover-summary">
            <SummaryComponent summary={summary} />
          </span>
        </ReactTooltip>
        <img
          className="game-img"
          src={src}
          alt={alt}
          data-tip
          data-event="mousemove"
          data-event-off="mouseleave"
          data-for={gameSummaryNum}
        />

        {loggedIn ? (
          <button
            className="card__never-played"
            onClick={() => this.handleModal()}
            type="button"
          >
            {"Don't show again"}
          </button>
        ) : (
          ""
        )}
        <button
          id="vote-button"
          className="nes-btn is-warning"
          type="button"
          onClick={() => this.handleVoteClick()}
        >
          Vote
        </button>
      </div>
    );
  }
}

const checkIfUser = state => {
  if (state.auth.currentUser === null) {
    return "there is no user";
  }
  return state.auth.currentUser.id;
};

const mapStateToProps = state => {
  return {
    games: state.games.battleGames,
    loggedIn: state.auth.currentUser !== null,
    userId: checkIfUser(state)
  };
};

export default connect(mapStateToProps)(Card);
