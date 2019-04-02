import React from 'react';
import { connect } from 'react-redux';
import { setNonUserVotes } from '../actions/gameActions'
import { nextTest } from '../actions/onboarding'
import { SignupPrompt } from './signupPrompt';
export class UserOnboard extends React.Component {
  count = 1
  handleVote = () => {
    let myKey;
    this.count += 1;
    myKey = `test${this.count}`;
    this.props.dispatch(nextTest(myKey))
  }

  render() {
    let { tests } = this.props;
    let content
    if (this.count < 11) {
      content =
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
    } else content = <SignupPrompt />
    return content
  }
}
const mapStateToProps = state => ({
  tests: state.onboard
});

export default connect(mapStateToProps)(UserOnboard)