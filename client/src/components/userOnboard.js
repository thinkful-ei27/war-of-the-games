import React from 'react';
import { connect } from 'react-redux';
import { fetchGames } from '../actions/gameActions'
import { nextTest } from '../actions/onboarding'
export class UserOnboard extends React.Component {

  render() {
    let count = 1;
    let myKey;
    let test = this.props.tests.showing[0].name;
    let { tests } = this.props;
    const { dispatch } = this.props;
    return (
      <div className="battle-container">
        <div className="card">
          <div className="title-container">
            <h1 className="game-title" >{tests.showing[0].name}</h1>
          </div>
          <img className="game-img" src={tests.showing[0].coverUrl} alt='test' />
          <button
            id="vote-button"
            className="nes-btn is-warning"
            type="button"
            key={tests.showing[0].id}
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
              console.log(e.target.id)
              count++;
              myKey = `test${count}`;
              dispatch(nextTest(myKey))
            }}
          >
            Vote
      </button>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  tests: state.onboard
});

export default connect(mapStateToProps)(UserOnboard)