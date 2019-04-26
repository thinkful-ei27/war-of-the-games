/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import ConnectedBattle from "../votePage/battle";
import VoteStats from "../votePage/vote-stats";
import ConnectedUserOnboard from "./userOnboard";
import ErrorBoundary from "../errorBoundary";
import "../styles/landing-page.css";
import "../styles/card.css";
import {
  fetchGames,
  fetchFeedback,
  handleVote
} from "../../actions/gameActions";
import { updateVotecount } from "../../actions/onboarding";
import { updateProgressBar } from "../../actions/progressBar";
import { loadVoteCount, checkVoteCount } from "../../local-storage";
import Loading from "../loading";

export class LandingPage extends React.Component {
  componentDidMount() {
    const { loggedIn, nonUserVotes, dispatch, userId } = this.props;

    if (loggedIn) {
      dispatch(updateProgressBar(true));

      if (nonUserVotes.length) {
        nonUserVotes.forEach(obj => {
          const values = Object.values(obj);
          if (userId) {
            dispatch(handleVote(values[0], values[1], values[2], userId));
          }
        });
      }
      return dispatch(fetchGames()).then(() =>
        dispatch(updateProgressBar(false))
      );
    }
    const voteCount = checkVoteCount();
    return dispatch(updateVotecount(voteCount));
  }

  handleFetchFeedback(game) {
    const { dispatch } = this.props;
    dispatch(fetchFeedback(game));
  }

  render() {
    const { loading } = this.props;
    let content;
    if (loading) {
      content = (
        <div className="loading-screen">
          <Loading />
        </div>
      );
    } else {
      const { games, loggedIn, feedback } = this.props;
      const count = parseInt(loadVoteCount(), 10);
      if (count <= 13 && !loggedIn) {
        content = <ConnectedUserOnboard />;
      } else if (count > 13 && !loggedIn) {
        content = <ErrorBoundary />;
      } else if (games.length === 0) {
        content = <div className="landing-page-loader">Just a moment...</div>;
      } else if (games.length && feedback) {
        content = (
          <div className="battle-vote">
            <ConnectedBattle
              fetchFeedback={game => this.handleFetchFeedback(game)}
              games={games}
            />
            <div className="vote-stats-container">
              <VoteStats feedback={feedback} {...games} />
            </div>
          </div>
        );
      } else {
        content = (
          <ConnectedBattle
            fetchFeedback={game => this.handleFetchFeedback(game)}
            games={games}
          />
        );
      }
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
  count: state.onboard.voteCount,
  nonUserVotes: state.games.nonUserVotes,
  motivations: state.user.motivations,
  userId: checkIfUser(state),
  loading: state.progressBar.loading
});

export default connect(mapStateToProps)(LandingPage);
