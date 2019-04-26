import React from "react";
import { connect } from "react-redux";
import { setNonUserVotes } from "../../actions/gameActions";
import {
  nextTestRequest,
  nextTestSuccess,
  setLoading,
  updateVoteCount
} from "../../actions/onboarding";
import OnboardPropmt from "./onboardPrompt";
import Loading from "../loading";
import { incrementVoteCount } from "../../local-storage";

export class UserOnboard extends React.Component {
  state = {
    loading: false
  };

  componentDidMount() {
    const { count, dispatch } = this.props;
    dispatch(nextTestSuccess(`test${count}`));
  }

  componentDidUpdate(prevProps) {
    const { count, dispatch } = this.props;
    if (count !== prevProps.count) {
      dispatch(nextTestSuccess(`test${count}`));
    }
  }

  handleVote = () => {
    const { count, dispatch } = this.props;
    incrementVoteCount(count);
    dispatch(updateVoteCount(count + 1));
    const myKey = `test${count + 1}`;
    dispatch(nextTestRequest());
    dispatch(setLoading());
    dispatch(nextTestSuccess(myKey));
  };

  render() {
    const { count, dispatch, tests } = this.props;
    const { loading } = this.state;
    let content;
    if (loading) {
      content = (
        <div className="loading-screen">
          <Loading />
        </div>
      );
    }
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
            <div className="vs-skip-container">
              <span className="vs">VS</span>
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
              value={count * 10}
              max="120"
            />
          </div>
        </>
      );
    } else if (count >= 11) {
      content = <OnboardPropmt />;
    }
    return content;
  }
}
const mapStateToProps = state => ({
  count: state.onboard.voteCount,
  loading: state.onboard.loading,
  tests: state.onboard
});

export default connect(mapStateToProps)(UserOnboard);
