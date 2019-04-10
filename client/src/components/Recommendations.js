import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { API_BASE_URL } from "../config";
import Game from "./Game";
import Logo from "../assets/favicon3.ico";
import Loading from "../components/loading";

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
              timeFrame: "Years",
              platforms: [
                { label: "PC", id: 6, checked: false },
                { label: "XBox One", id: 49, checked: false },
                { label: "PS4", id: 48, checked: false }
              ]
            },
            headers: { Authorization: `Bearer ${token}` }
          });
        })
        .then(results => {
          // Creates a massaged array of user recommendations
          const { data } = results;

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
    const { isMobile, profileWidth, loading } = this.props;
    const topFiveRecs = recs.slice(0, 5);
    if (isLoading) {
      return <Loading />;
    }
    if (!recs.length && !isLoading) {
      return (
        <div>
          <strong>Start Voting to see some recommendations!!!</strong>
        </div>
      );
    }
    return (
      <div className="rec-container">
        {isMobile && <hr className="mt-8" />}
        <Link to="/profile/recommendations">
          <h3 className={isMobile ? "w-3/4 mx-auto text-base mt-4" : undefined}>
            <i className="nes-icon coin" />
            Recommendations >
          </h3>
        </Link>
        <div
          className={`flex ${isMobile ? "flex-col text-xs w-3/4 mx-auto" : ""}`}
        >
          {topFiveRecs.map(rec => (
            <Game
              key={rec.id}
              name={rec.name}
              slug={rec.slug}
              cloudImage={rec.cover ? rec.cover.url : rec.cloudImage || Logo}
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

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.currentUser !== null,
    loading: state.auth.loading,
    token: state.auth.authToken
  };
};

export default connect(mapStateToProps)(Recommendations);
