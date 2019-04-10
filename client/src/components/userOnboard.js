import React from "react";
import { connect } from "react-redux";
import { setNonUserVotes } from "../actions/gameActions";
import { nextTest } from "../actions/onboarding";
import OnboardPropmt from "./onboardPrompt";
import {
  setVoteLocalStorageVariable,
  incrementVoteCount,
  loadVoteCount
} from "../local-storage";

export class UserOnboard extends React.Component {
  state = {
    count: Number(loadVoteCount())
  };

  count = Number(loadVoteCount());

  componentWillMount() {
    const { dispatch } = this.props;
    setVoteLocalStorageVariable();
    const myKey = `test${this.count}`;
    dispatch(nextTest(myKey));
  }

  handleVote = () => {
    let myKey;
    this.count++
    incrementVoteCount();
    myKey = `test${this.count}`;
    this.props.dispatch(nextTest(myKey))
  }

  render() {
    const { count } = this.state;
    const { dispatch, tests } = this.props;
    let content;

    if (count < 13) {
      content = (
        <>
          <div className="battle-container">
            <div className="card">
              <div className="title-container">
                <h1 className="game-title">{tests.showing[0].name}</h1>
              </div>
              <img
                className="game-img"
                src={tests.showing[0].coverUrl}
                alt="test"
              />
              <button
                id={tests.showing[0].id}
                className="nes-btn is-warning"
                type="button"
                key={tests.showing[0].id}
                onClick={e => {
                  this.handleVote();
                  dispatch(
                    setNonUserVotes(
                      tests.showing[0].id,
                      tests.showing[1].id,
                      e.target.id
                    )
                  );
                }}
              >
                Vote
              </button>
            </div>
            <div className="card-onboard-2">
              <div className="title-container">
                <h1 className="game-title">{tests.showing[1].name}</h1>
              </div>
              <img
                className="game-img"
                src={tests.showing[1].coverUrl}
                alt="test"
              />
              <button
                id={tests.showing[1].id}
                className="nes-btn is-warning"
                type="button"
                onClick={e => {
                  this.handleVote();
                  dispatch(
                    setNonUserVotes(
                      tests.showing[0].id,
                      tests.showing[1].id,
                      e.target.id
                    )
                  );
                }}
              >
                Vote
              </button>
            </div>
          </div>
          <div className="onboarding-progress-container">
            <p>Exp:</p>
            <progress
              id="onboarding-progress"
              className="nes-progress is-primary"
              value={this.count * 10}
              max="120"
            />
          </div>
        </>
      );
    } else if (this.count >= 11) {
      content = <OnboardPropmt />;
    }
    return content;
  }
}
const mapStateToProps = state => ({
  tests: state.onboard
});

export default connect(mapStateToProps)(UserOnboard);
