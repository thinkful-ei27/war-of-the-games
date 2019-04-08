import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { API_BASE_URL } from "../config";
import Game from "./Game";
import Rec from "./Rec";

const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] === "desc"
            ? [b[prop], a[prop]]
            : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );

export class RecommendationsPage extends Component {
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
    // Loads some recs on initial load
    this.loadRecs();
  }

  loadRecs() {
    this.setState({ isLoading: true }, () => {
      const { token } = this.props;
      axios({
        url: `${API_BASE_URL}/users/history/submotivations`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(subMotivations => {
          const { choicePercentages } = subMotivations.data;
          const motivations = Object.keys(choicePercentages).reduce(
            (a, key) => {
              const obj = { name: key, value: choicePercentages[key] };
              a.push(obj);
              return a;
            },
            []
          );
          const orderedMotivations = orderBy(motivations, ["value"], ["desc"]);
          return axios({
            url: `${API_BASE_URL}/users/recs`,
            method: "POST",
            data: {
              motivations: [
                orderedMotivations[0].name,
                orderedMotivations[1].name
              ],
              dateNumber: 1,
              timeFrame: "Years"
            },
            headers: { Authorization: `Bearer ${token}` }
          });
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

    return (
      <div>
        <h1 className="text-center mt-16">
          <i className="nes-icon coin" />
          Recommendations
          <i className="nes-icon coin" />
        </h1>
        <div className="game-container mx-auto mt-16">
          {recs.map(rec => (
            <Rec game={rec} />
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

export default connect(mapStateToProps)(RecommendationsPage);
