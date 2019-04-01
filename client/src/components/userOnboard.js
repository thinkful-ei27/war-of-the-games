import React from 'react';

export class UserOnboard extends React.Component {
  state = {
    test1: [
      {
        name: 'god of war 2',
        id: "5c9bfc61054d8f2e1010f122",
        coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/f3mwxy3opbrbmcyguhly.jpg"
      },
      {
        name: 'tetris',
        id: "5c9bf9df054d8f2e1010f111",
        coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/co1hvk.jpg"
      }
    ],
    test2: [
      {
        name: "Resident Evil 4",
        coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/yj6gl8pylzyvskqki3sy.jpg",
        id: "5c9bf8e6054d8f2e1010f109"
      },
      {
        name: "Final Fantasy VIII",
        coverUrl: "https://images.igdb.com/igdb/image/upload/t_720p/w2yteagrractpjc47zey.jpg",
        id: "14253642354"
      }]
  }
  render() {
    let count = 1
    let myKey = `test1`
    return (
      <div className="battle-container">
        <div className="card">
          <div className="title-container">
            <h1 className="game-title" key={this.state[myKey][0].id}>{this.state[myKey][0].name}</h1>
          </div>
          <img className="game-img" src={this.state[myKey][0].coverUrl} alt={this.state.test1[0].name} />
          <button
            id="vote-button"
            className="nes-btn is-warning"
            type="button"
            onClick={() => {
              count += 1;
              myKey = `test${count}`
              console.log(myKey)
            }}
          >
            Vote
      </button>
        </div>
        <div className="card">
          <div className="title-container">
            <h1 className="game-title" key={this.state[myKey][0].id}>{this.state[myKey][1].name}</h1>
          </div>
          <img className="game-img" src={this.state[myKey][1].coverUrl} alt={this.state.test1[0].name} />
          <button
            id="vote-button"
            className="nes-btn is-warning"
            type="button"
          >
            Vote
      </button>
        </div>
      </div>
    )
  }
}