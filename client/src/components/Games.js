import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { fetchAllGames } from "../actions/allGames";
import ConnectedGame from "./Game";
import "./styles/gameInfo.css";

export class Games extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllGames());
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
        return <ConnectedGame key={id} {...props} />;
      });
    }
    return (
      <section className="game-container mx-auto">
        <div>
          <h1>
            <i className="nes-logo" />
            <i className="nes-jp-logo" />
            <i className="snes-logo" />
            <i className="snes-jp-logo" />
            Games
            <i className="nes-icon coin" />
          </h1>
        </div>
        <div className="nes-field mt-16">
          <label htmlFor="search" />
          <input
            type="text"
            id="search"
            className="nes-input"
            placeholder="Search hundreds of games in our database!"
          />
        </div>
        <div className="flex justify-start content-start flex-wrap mt-16">
          {allGames}
        </div>
      </section>
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
