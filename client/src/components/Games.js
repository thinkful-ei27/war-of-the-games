import React, { Component } from "react";
import { fetchAllGames } from "../actions/allGames";
import { connect } from "react-redux";
import ConnectedGame from "./Game";

const normalize = (value, compare) => {
  const v = value.toLowerCase().trim();
  const c = compare.toLowerCase().trim();
  return c.includes(v);
}

export class InfiniteGames extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      loadedGames: [],
      value: ''
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadGames,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      const scrollHeight = document.documentElement.scrollHeight;
      const pageYOffset = window.pageYOffset;
      const clientHeight = document.documentElement.clientHeight;
      if (
        pageYOffset + clientHeight >= scrollHeight
      ) {
        loadGames();
      }
    };
  }

  async componentDidMount() {
    // Loads some games on initial load
    const { dispatch } = this.props;
    await dispatch(fetchAllGames());
    this.loadGames();
  }

  loadGames = () => {
    this.setState({ isLoading: true }, () => {      
      const { games } = this.props;
      const { loadedGames } = this.state;
      const loadedLength = loadedGames.length;
      const nextGames = games.slice(loadedLength, loadedLength + 10);

      // Merges the next users into our existing users
      this.setState({
        // Note: Depending on the API you're using, this value may
        // be returned as part of the payload to indicate that there
        // is no additional data to be loaded
        hasMore: (this.state.loadedGames.length < games.length),
        isLoading: false,
        loadedGames: [
          ...this.state.loadedGames,
          ...nextGames,
        ],
      });
        })
  }

  search = () => {
    this.setState({ loading: true})
  }

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      loadedGames,
      value
    } = this.state;
    const { games } = this.props;

    let renderGames = loadedGames.map(game => {
      const { name, igdb, id, cloudImage } = game;
      const { slug } = igdb;
      const props = {
        id,
        name,
        cloudImage,
        slug
      };
      return <ConnectedGame key={id} {...props} />;
    }).filter(game => {
      const { name } = game.props;
      const { value } = this.state;
      return normalize(value, name);
    })
    let filterGames = games.map(game => {
      const { name, igdb, id, cloudImage } = game;
      const { slug } = igdb;
      const props = {
        id,
        name,
        cloudImage,
        slug
      };
      return <ConnectedGame key={id} {...props} />;
    }).filter(game => {
      const { name } = game.props;
      const { value } = this.state;
      return normalize(value, name);
    })

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
        {value ? filterGames : renderGames}
        <hr />
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>Loading...</div>
        }
        {!hasMore &&
          <div>You did it! You reached the end!</div>
        }
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

export default connect(mapStateToProps)(InfiniteGames);