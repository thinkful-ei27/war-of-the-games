import React from 'react';
import { connect } from 'react-redux';
import { setNonUserVotes } from '../actions/gameActions'
import { nextTest } from '../actions/onboarding'
import { SignupPrompt } from './signupPrompt';
import { setVoteLocalStorageVariable, saveVoteCount, incrementVoteCount, loadVoteCount } from '../local-storage'
export class UserOnboard extends React.Component {

  count = Number(loadVoteCount())

  handleVote = () => {
    let myKey;
    this.count++
    incrementVoteCount();
    myKey = `test${this.count}`;
    this.props.dispatch(nextTest(myKey))
  }

  componentWillMount() {
    setVoteLocalStorageVariable()
  }

  render() {
    console.log(this.count)
    let { tests } = this.props;
    let content;
    if (!tests.showing.length || tests.showing === undefined) {
      content =
        <div className="card">
          <h1>Welcome to War of the Games!</h1>
          <p className="about-page-text">Pick a Winner in Matchups of Legendary Games! Sign In and Keep Voting
            to Get Recomendations
          </p>
          <button
            className="nes-btn is-warning"
            type="button"
            onClick={() => {
              this.handleVote()
            }}>Get Started, or Pick Up Where You Left Off</button>
        </div>
    }
    else if (this.count < 11 && this.count > 0) {
      content =
        <>
          <div className="battle-container">
            <div className="card">
              <div className="title-container">
                <h1 className="game-title" >{tests.showing[0].name}</h1>
              </div>
              <img className="game-img" src={tests.showing[0].coverUrl} alt='test' />
              <button
                id={tests.showing[0].id}
                className="nes-btn is-warning"
                type="button"
                key={tests.showing[0].id}
                onClick={(e) => {
                  this.handleVote()
                  this.props.dispatch(setNonUserVotes(tests.showing[0].id, tests.showing[1].id, e.target.id))
                }}
              >
                Vote
            </button>
            </div>
            <div className="card">
              <div className="title-container">
                <h1 className="game-title" >{tests.showing[1].name}</h1>
              </div>
              <img className="game-img" src={tests.showing[1].coverUrl} alt='test' />
              <button
                id={tests.showing[1].id}
                className="nes-btn is-warning"
                type="button"
                onClick={(e) => {
                  this.handleVote()
                  this.props.dispatch(setNonUserVotes(tests.showing[0].id, tests.showing[1].id, e.target.id))
                }}
              >
                Vote
            </button>
            </div>
          </div >
          <div className="onboarding-progress-container">
            <p>Progress:</p>
            <progress id="onboarding-progress" className="nes-progress is-primary" value={this.count * 10} max="110"></progress>
          </div>
        </>
    } else if (this.count >= 10) {
      content = <SignupPrompt />
    }
    return content
  }
}
const mapStateToProps = state => ({
  tests: state.onboard
});

export default connect(mapStateToProps)(UserOnboard)