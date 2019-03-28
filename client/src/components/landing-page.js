/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import Battle from "./battle";
import VoteStats from "./vote-stats";
import "./styles/landing-page.css";
import { SignupPrompt } from "./signupPrompt";
import "./styles/card.css";
import { fetchGames } from "../actions/gameActions";
import { loadVoteCount, setVoteLocalStorageVariable } from "../local-storage";

export class LandingPage extends React.Component {
  componentDidMount() {
    setVoteLocalStorageVariable();
    const { dispatch } = this.props;
    dispatch(fetchGames());
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
          <Battle {...games} />
          <div className="vote-stats-container">
            <VoteStats feedback={feedback} {...games} />
          </div>
        </div>
      );
    } else if (games.length) {
      content = <Battle {...games} />;
    } else {
      content = <div>loading...</div>;
    }

    return content;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  games: state.games.battleGames,
  // If you want to show the Vote Stats Container, change `feedback`
  // below, to anything truthy and it will appear
  feedback: state.games.feedback || "sup",
  count: state.games.sessionVoteCount
});

export default connect(mapStateToProps)(LandingPage);
