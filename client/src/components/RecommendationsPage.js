import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { API_BASE_URL } from "../config";
// import Game from "./Game";
import Rec from "./Rec";
import Loading from "./loading";

export class RecommendationsPage extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      isLoading: true,
      recs: []
    };
  }

  componentDidMount() {
    // Loads some users on initial load
    this.loadRecs();
  }

  loadRecs() {
    this.setState({ isLoading: true }, () => {
      const { token } = this.props;
      axios({
        url: `${API_BASE_URL}/users/recommendations`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(results => {
          // Creates a massaged array of user recommendations
          const { data } = results;
          console.log(data);

          // Places recommendations into state.
          this.setState({
            isLoading: false,
            recs: data
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  }

  handleExcludeRec(e, id) {
    console.log(id);
    if (e.type === "keypress" && e.key === "Enter") {
      this.handleFilter(id);
    }
    this.handleFilter(id);
  }

  handleFilter(id) {
    const { token } = this.props;
    this.setState(prevState => ({
      recs: prevState.recs.filter(rec => rec.id !== id)
    }));
    axios({
      url: `${API_BASE_URL}/users/excludedGames`,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: {
        excludedId: id
      }
    });
  }

  render() {
    const { error, isLoading, recs } = this.state;
    const topFiveRecs = recs.slice(0, 5);

    return (
      <div>
        <h1 className="text-center mt-16">
          <i className="nes-icon coin" />
          Recommendations
          <i className="nes-icon coin" />
        </h1>
        <div className="game-container mx-auto mt-16">
          {topFiveRecs.length
            ? topFiveRecs.map(rec => (
                // <Game
                //   name={rec.name}
                //   slug={rec.igdb.slug}
                //   cloudImage={rec.cloudImage}
                // />
                <Rec
                  key={rec.id}
                  excludeRec={(e, id) => this.handleExcludeRec(e, id)}
                  game={rec}
                />
              ))
            : !isLoading && (
                <div className="text-center">
                  No recommendations for you ¯\_(ツ)_/¯
                </div>
              )}
        </div>
        <hr />
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && (
          <div className="w-1/3 mx-auto">
            <Loading size="lg" incrementBy={5} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading,
  token: state.auth.authToken
});

export default connect(mapStateToProps)(RecommendationsPage);
