/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import Battle from "./battle";
import Sprites from "./Sprites";
import VoteStats from "./vote-stats";
import UserOnboard from './userOnboard';
import "./styles/landing-page.css";
import { SignupPrompt } from "./signupPrompt";
import "./styles/card.css";
import { fetchGames, fetchFeedback, handleVote } from "../actions/gameActions";
import { loadVoteCount, setVoteLocalStorageVariable } from "../local-storage";

export class LandingPage extends React.Component {
  componentDidMount() {
    const { loggedIn, nonUserVotes, dispatch, userId } = this.props;

    if (loggedIn && nonUserVotes.length) {
      nonUserVotes.forEach(obj => {
        const values = Object.values(obj);
        if (userId) {
          dispatch(handleVote(values[0], values[1], values[2], userId));
        }
      });
    }
    setVoteLocalStorageVariable();
    dispatch(fetchGames());
  }

  handleFetchFeedback(game) {
    const { dispatch } = this.props;
    dispatch(fetchFeedback(game));
  }

  render() {
    const { games, loggedIn, feedback } = this.props;
    let content;
    const count = parseInt(loadVoteCount(), 10);
    if (count <= 13 && !loggedIn) {
      content = <Sprites />;
    }
    else if (count > 13 && !loggedIn) {
      content = <SignupPrompt />;
    }
    else if (games.length && feedback) {
      content = (
        <div className="battle-vote">
          <Battle
            fetchFeedback={game => this.handleFetchFeedback(game)}
            {...games}
          />
          <div className="vote-stats-container">
            <VoteStats feedback={feedback} {...games} />
          </div>
        </div>
      );
    } else if (games.length) {
      content = (
        <Battle
          fetchFeedback={game => this.handleFetchFeedback(game)}
          {...games}
        />
      );
    } else {
      content = <div className="landing-page-loader">loading...</div>;
    }

    return content;
  }
}

const checkIfUser = state => {
  if (state.auth.currentUser === null) {
    return "there is no user";
  }
  return state.auth.currentUser.id;
};
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  games: state.games.battleGames,
  feedback: state.games.feedback,
  count: state.games.sessionVoteCount,
  nonUserVotes: state.games.nonUserVotes,
  userId: checkIfUser(state)
});

export default connect(mapStateToProps)(LandingPage);
