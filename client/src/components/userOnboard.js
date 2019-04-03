import React from 'react';
import { connect } from 'react-redux';
import { setNonUserVotes } from '../actions/gameActions'
import { nextTest } from '../actions/onboarding'
import { SignupPrompt } from './signupPrompt';
import { setVoteLocalStorageVariable, saveVoteCount, incrementVoteCount, loadVoteCount } from '../local-storage'
export class UserOnboard extends React.Component {

  count = Number(loadVoteCount());

  evaluateCount = function (count) {
    const table = {
      '1': 100,
      '2': 90,
      '3': 80,
      '4': 70,
      '5': 60,
      '6': 50,
      '7': 40,
      '8': 30,
      '9': 20,
      '10': 10,
    }
    return table[count]
  }

  handleVote = () => {
    let myKey;
    this.count++
    incrementVoteCount();
    myKey = `test${this.count}`;
    this.props.dispatch(nextTest(myKey))
    this.value -= 10
  }

  componentWillMount() {
    setVoteLocalStorageVariable()
    let myKey;
    myKey = `test${this.count}`;
    this.props.dispatch(nextTest(myKey))
  }

  render() {
    let { tests } = this.props;
    let content;

    if (this.count < 11) {
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
            <p>Health:</p>
            <progress id="onboarding-progress" className="nes-progress is-primary" value={this.evaluateCount(loadVoteCount())} max="100"></progress>
          </div>
        </>
    }
    else if (this.count >= 11) {
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
            }}>Let's a Go!</button>
        </div>
    }
    return content
  }
}
const mapStateToProps = state => ({
  tests: state.onboard
});

export default connect(mapStateToProps)(UserOnboard)