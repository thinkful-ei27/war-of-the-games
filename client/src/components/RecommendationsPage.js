import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "./Modal";
import { API_BASE_URL } from "../config";
// import Game from "./Game";
import Rec from "./Rec";
import Loading from "./loading";
import ExcludedGames from "./ExcludedGames";

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
      showMoreRecs: false,
      scope: 2,
      dateNumber: 1,
      timeFrame: "Years",
      excludedGames: []
    };
  }

  componentDidMount() {
    // Loads some recs on initial load
    this.loadRecs();
    this.loadExcludedRecs();
  }

  loadExcludedRecs() {
    this.setState({ isLoading: true }, () => {
      const { token } = this.props;
      axios({
        url: `${API_BASE_URL}/users/excludedgames`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const excludedGames = res.data;
          this.setState({ excludedGames, isLoading: false });
        })
        .catch(err => {
          this.setState({ error: err.message, isLoading: false });
        });
    });
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
          const final = orderedMotivations
            .slice(0, this.state.scope)
            .map(motive => motive.name);
          console.log(final);
          return axios({
            url: `${API_BASE_URL}/users/recs`,
            method: "POST",
            data: {
              motivations: final,
              dateNumber: this.state.dateNumber,
              timeFrame: this.state.timeFrame
            },
            headers: { Authorization: `Bearer ${token}` }
          });
        })
        .then(results => {
          const { data } = results;
          // console.log("we have new data");

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

  handleRemoveExcluded(id) {
    this.setState(prevState => ({
      excludedGames: prevState.excludedGames.filter(rec => rec.igdb.id !== id)
    }));
  }

  handleFilter(id) {
    this.setState(prevState => ({
      recs: prevState.recs.filter(rec => rec.id !== id)
    }));
  }

  handleMoreRecs() {
    this.setState(prevState => ({
      showMoreRecs: !prevState.showMoreRecs
    }));
  }

  handleTimeFrame(e) {
    const { id } = e.target;
    const dateNumber = id === "10 years" ? 10 : 1;
    const timeFrame = id === "1 month" ? "Months" : "Years";

    this.setState(
      {
        dateNumber,
        timeFrame
      },
      () => this.loadRecs()
    );
  }

  handleScope(e) {
    const { id } = e.target;
    const scope = id === "Narrow" ? 1 : id === "Broad" ? 3 : 2;

    this.setState(
      {
        scope
      },
      () => this.loadRecs()
    );
  }

  render() {
    const {
      error,
      isLoading,
      recs,
      showModal,
      igdbId,
      showMoreRecs,
      excludedGames
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
        <div className="game-container mx-auto">
          <div className="nes-container with-title is-centered">
            <p className="title">Filters</p>
            <div className="mt-4">
              <h3>Time Frame</h3>
              <button
                type="button"
                className={`nes-btn ${
                  this.state.timeFrame === "Months" ? "is-primary" : ""
                } mx-4`}
                id="1 month"
                onClick={e => this.handleTimeFrame(e)}
              >
                1 Month
              </button>
              <button
                type="button"
                className={`nes-btn ${
                  this.state.dateNumber === 1 &&
                  this.state.timeFrame === "Years"
                    ? "is-primary"
                    : ""
                } mx-4`}
                id="1 year"
                onClick={e => this.handleTimeFrame(e)}
              >
                1 Year
              </button>
              <button
                type="button"
                className={`nes-btn ${
                  this.state.dateNumber === 10 ? "is-primary" : ""
                } mx-4`}
                id="10 years"
                onClick={e => this.handleTimeFrame(e)}
              >
                10 Years
              </button>
            </div>
            <div className="m-4">
              <h3>Scope of Recommendations</h3>
              <button
                type="button"
                className={`nes-btn ${
                  this.state.scope === 1 ? "is-primary" : ""
                } mx-4`}
                id="Narrow"
                onClick={e => this.handleScope(e)}
              >
                Narrow
              </button>
              <button
                type="button"
                className={`nes-btn ${
                  this.state.scope === 2 ? "is-primary" : ""
                } mx-4`}
                id="Balanced"
                onClick={e => this.handleScope(e)}
              >
                Balanced
              </button>
              {/* <button
                type="button"
                className={`nes-btn ${
                  this.state.scope === 3 ? "is-primary" : ""
                } mx-4`}
                id="Broad"
                onClick={e => this.handleScope(e)}
              >
                Broad
              </button> */}
            </div>
          </div>
        </div>
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
          <ExcludedGames
            onRemoveExcluded={id => this.handleRemoveExcluded(id)}
            screenWidth={screenWidth}
            excludedGames={excludedGames}
          />
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
