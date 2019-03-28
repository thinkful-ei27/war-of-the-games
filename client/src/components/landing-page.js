/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import Battle from "./battle";
import VoteStats from "./vote-stats";
import "./styles/landing-page.css";
import { SignupPrompt } from "./signupPrompt";
import "./styles/card.css";
import { fetchGames, fetchFeedback } from "../actions/gameActions";
import { loadVoteCount, setVoteLocalStorageVariable } from "../local-storage";

export class LandingPage extends React.Component {
  componentDidMount() {
    setVoteLocalStorageVariable();
    const { dispatch } = this.props;
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
    if (count >= 5 && !loggedIn) {
      content = <SignupPrompt />;
    } else if (games.length && feedback) {
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

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  games: state.games.battleGames,
  feedback: state.games.feedback,
  count: state.games.sessionVoteCount
});

export default connect(mapStateToProps)(LandingPage);
