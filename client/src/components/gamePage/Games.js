import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllGames } from "../../actions/allGames";
import ConnectedGame from "./Game";

const normalize = (value, compare) => {
  const v = value.toLowerCase().trim();
  const c = compare.toLowerCase().trim();
  return c.includes(v);
};

export class InfiniteGames extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      loadedGames: [],
      value: ""
    };

    this.onScroll = this.onScroll.bind(this);
  }

  async componentDidMount() {
    // Loads some games on initial load
    const { dispatch } = this.props;
    window.addEventListener("scroll", this.onScroll);
    await dispatch(fetchAllGames());
    this.loadGames();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    const {
      loadGames,
      state: { error, isLoading, hasMore }
    } = this;

    // Bails early if:
    // * there's an error
    // * it's already loading
    // * there's nothing left to load
    if (error || isLoading || !hasMore) return;

    // Checks that the page has scrolled to the bottom
    const { scrollHeight } = document.documentElement;
    const { pageYOffset } = window;
    const { clientHeight } = document.documentElement;
    if (pageYOffset + clientHeight >= scrollHeight) {
      loadGames();
    }
  }

  loadGames = () => {
    const { loadedGames } = this.state;
    this.setState({ isLoading: true }, () => {
      const { games } = this.props;
      const loadedLength = loadedGames.length;
      const nextGames = games.slice(loadedLength, loadedLength + 10);

      // Merges the next users into our existing users
      this.setState({
        // Note: Depending on the API you're using, this value may
        // be returned as part of the payload to indicate that there
        // is no additional data to be loaded
        hasMore: loadedGames.length < games.length,
        isLoading: false,
        loadedGames: [...loadedGames, ...nextGames]
      });
    });
  };

  onChangeHandler = async e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { error, hasMore, isLoading, loadedGames, value } = this.state;
    const { games, loading, screenWidth } = this.props;

    const renderGames = loadedGames
      .map(game => {
        const { name, igdb, id, cloudImage } = game;
        const { slug } = igdb;
        const props = {
          id,
          name,
          cloudImage,
          slug,
          screenWidth
        };
        return <ConnectedGame key={id} {...props} />;
      })
      .filter(game => {
        const { name } = game.props;
        return normalize(value, name);
      });
    const filterGames = games
      .map(game => {
        const { name, igdb, id, cloudImage } = game;
        const { slug } = igdb;
        const props = {
          id,
          name,
          cloudImage,
          slug,
          screenWidth
        };
        return <ConnectedGame key={id} {...props} />;
      })
      .filter(game => {
        const { name } = game.props;
        return normalize(value, name);
      });

    const renderGamesList =
      isLoading || loading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        <div className="flex justify-start content-start flex-wrap mt-16">
          {value ? filterGames : renderGames}
          <hr />
          {error && <div style={{ color: "#900" }}>{error}</div>}
          {isLoading && <div>Loading...</div>}
          {!hasMore && <div>You did it! You reached the end!</div>}
        </div>
      );

    return (
      <section className="game-container mx-auto">
        <div className="text-center text-2xl mt-16">
          <h1>
            <i className="nes-logo mx-4" />
            <i className="nes-jp-logo mx-4" />
            Games
            {screenWidth > 768 && <i className="snes-logo mx-4" />}
            {screenWidth > 768 && <i className="snes-jp-logo mx-4" />}
          </h1>
        </div>
        <div className="nes-field mt-16 w-3/4 mx-auto">
          <input
            type="text"
            className="nes-input"
            value={value}
            onChange={e => this.onChangeHandler(e)}
            placeholder={
              screenWidth > 768 ? "Type something to search" : "Search Games"
            }
          />
        </div>
        {renderGamesList}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    loading: state.allGames.loading,
    screenWidth: state.window.width
  };
};

export default connect(mapStateToProps)(InfiniteGames);
