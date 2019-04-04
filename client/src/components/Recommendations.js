import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { API_BASE_URL } from "../config";
import Game from "./Game";

export class Recommendations extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      isLoading: false,
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

  render() {
    const { error, isLoading, recs } = this.state;
    const { isMobile, profileWidth } = this.props;

    return (
      <div>
        {isMobile && <hr className="mt-8" />}
        <Link to="/profile/recommendations">
          <h3 className={isMobile && "w-3/4 mx-auto text-base mt-4"}>
            <i className="nes-icon coin" />
            Recommendations >
          </h3>
        </Link>
        <div className={`flex ${isMobile && "flex-col text-xs w-3/4 mx-auto"}`}>
          {recs.map(rec => (
            <Game
              key={rec.name}
              name={rec.name}
              slug={rec.igdb.slug}
              cloudImage={rec.cloudImage}
              profileFontSize="text-xs"
              profileWidth={profileWidth}
            />
          ))}
        </div>
        <hr />
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <div>Loading...</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading,
  token: state.auth.authToken
});

export default connect(mapStateToProps)(Recommendations);
