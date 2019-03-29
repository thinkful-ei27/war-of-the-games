import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllGames } from "../actions/allGames";
import Game from "./Game";
import "./styles/gameInfo.css";
import { GameInfo } from "./GameInfo";

export class Games extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAllGames());
  }

  render() {
    const { loading, games } = this.props;
    let allGames;
    if (loading || !games) {
      allGames = <div>Loading...</div>;
    } else {
      allGames = games.map(game => {
        const { name, igdb, id } = game;
        const { slug } = igdb;
        const props = {
          id,
          name,
          // coverUrl,
          slug
        };
        return <Game {...props} />;
      });
    }
    return (
      <div className="flex justify-start content-start flex-wrap">
        {allGames}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    loading: state.allGames.loading
  };
};

export default connect(mapStateToProps)(Games);
