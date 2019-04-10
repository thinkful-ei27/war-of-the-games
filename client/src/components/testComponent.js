import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import { fetchGames } from "../actions/gameActions";

export class TestComponent extends React.Component {
  render() {
    const { currentGames } = this.props.games;
    const content = currentGames.map((game, i) => {
      return <p key={i}>Hello from {game}</p>;
    });

    return (
      <div>
        {content}
        <button onClick={() => this.props.dispatch(fetchGames())}>
          get games
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games
});

export default connect(mapStateToProps)(TestComponent);
