import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { fetchAllGames } from "../actions/allGames";
import ConnectedGame from "./Game";
import "./styles/gameInfo.css";

export class Games extends Component {
  state = {
    loading: false,
    value: ''
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllGames());
  }

  search = () => {
    this.setState({ loading: true})
  }

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  }

  get renderGames() {
    let filteredGames = <h1>There's no games</h1>;
    if (this.props.games) {
      filteredGames = this.props.games.map(game => {
        const { name, igdb, id } = game;
        const { slug } = igdb;
        const props = {
          id,
          name,
          // coverUrl,
          slug
        };
        return <ConnectedGame key={id} {...props} />;
      }).filter(game => {
        return game.props.name.toLowerCase().includes(this.state.value)
      });
    }

    return filteredGames;
  }

  render() {
    return (
      <section className="game-container mx-auto">
        <div className="text-center text-2xl mt-16">
          <h1>
            <i className="nes-logo mx-4" />
            <i className="nes-jp-logo mx-4" />
            Games
            <i className="snes-logo mx-4" />
            <i className="snes-jp-logo mx-4" />
          </h1>
        </div>
        <div className="nes-field mt-16">
          <input
            type='text'
            className='nes-input'
            value={this.state.value}
            onChange={e => this.onChangeHandler(e)}
            placeholder="Type something to search"
          />
        </div>
        <div className="flex justify-start content-start flex-wrap mt-16">
        {this.renderGames}
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
