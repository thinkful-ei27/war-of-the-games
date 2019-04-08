import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "./Modal";
import { API_BASE_URL } from "../config";
// import Game from "./Game";
import Rec from "./Rec";
import Loading from "./loading";

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
      isLoading: true,
      recs: [],
      showModal: false,
      igdbId: null,
      showMoreRecs: false
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

  handleModal(id = null) {
    const { showModal } = this.state;
    if (id) {
      this.setState({
        igdbId: id
      });
    }
    if (showModal) {
      this.clearId();
    }

    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  clearId() {
    this.setState({ igdbId: null });
  }

  handleExcludeRec(id) {
    const { token } = this.props;
    this.handleFilter(id);
    axios.put(
      `${API_BASE_URL}/users/excludedgames`,
      {
        excludedId: id
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    this.handleModal();
  }

  handleFilter(id) {
    this.setState(prevState => ({
      recs: prevState.recs.filter(rec => rec.igdb.id !== id)
    }));
  }

  handleMoreRecs() {
    this.setState(prevState => ({
      showMoreRecs: !prevState.showMoreRecs
    }));
  }

  render() {
    const {
      error,
      isLoading,
      recs,
      showModal,
      igdbId,
      showMoreRecs
    } = this.state;
    const { screenWidth } = this.props;
    const topFiveRecs = recs.slice(0, 5);
    const iconSize = screenWidth <= 576 ? "is-small" : undefined;
    const moreRecs = recs.length ? (
      recs
        .slice(5)
        .map(rec => (
          <Rec key={rec.id} game={rec} openModal={id => this.handleModal(id)} />
        ))
    ) : (
      <div>No more recommendations</div>
    );

    return (
      <div>
        <Modal
          showModal={showModal}
          igdbId={igdbId}
          handleModal={() => this.handleModal()}
          handleExcludeRec={id => this.handleExcludeRec(id)}
        />
        <h1 className="rec-pg-title text-center mt-16">
          <i className={`nes-icon coin ${iconSize}`} />
          Recommendations
          <i className={`nes-icon coin ${iconSize}`} />
        </h1>
        <div className="game-container mx-auto mt-16">
          {topFiveRecs.length
            ? topFiveRecs.map(rec => (
                <Rec
                  key={rec.id}
                  game={rec}
                  openModal={id => this.handleModal(id)}
                />
              ))
            : !isLoading && (
                <div className="text-center">
                  No recommendations for you ¯\_(ツ)_/¯
                </div>
              )}
          {showMoreRecs ? moreRecs : undefined}
          {!isLoading && (
            <div className="game-container text-center">
              <button
                onClick={() => this.handleMoreRecs()}
                className="nes-btn"
                type="button"
              >
                {!showMoreRecs
                  ? "Show More Recommendations"
                  : "Show Less Recommendations"}
              </button>
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
  token: state.auth.authToken,
  screenWidth: state.window.width
});

export default connect(mapStateToProps)(RecommendationsPage);
