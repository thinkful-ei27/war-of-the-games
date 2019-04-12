import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import AvatarLeaderboard from "./AvatarLeaderboard";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      isLoading: false,
      users: []
    };
  }

  componentDidMount() {
    // Loads some users on initial load
    this.loadUsers();
  }

  loadUsers() {
    this.setState({ isLoading: true }, () => {
      axios({
        url: `${API_BASE_URL}/users/leaderboard`,
        method: "GET"
      })
        .then(results => {
          // Creates a massaged array of user recommendations
          const { data } = results;

          // Places recommendations into state.
          this.setState({
            isLoading: false,
            users: data
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
    const { users, error, isLoading } = this.state;
    return (
      <section className="game-container mx-auto">
        <div className="text-center text-2xl mt-16">
          <h1>
            <i className="nes-icon trophy mx-4" />
            Leaders
            <i className="nes-icon trophy mx-4" />
          </h1>
        </div>

        <div className="flex flex-col flex-wrap mt-16">
          {users.map(rec => (
            <AvatarLeaderboard
              key={rec.username}
              username={rec.username}
              xpToNextLevel={rec.xpToNextLevel}
              level={rec.level}
              profilePic={rec.profilePic}
            />
          ))}
        </div>
        <hr />
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <div className="loading-screen">Loading...</div>}
      </section>
    );
  }
}
