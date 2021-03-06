/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "../Modal";
import { API_BASE_URL } from "../../config";
// import Game from "./Game";

import Loading from "../loading";
import ExcludedGames from "../ExcludedGames";
import MultiselectCheckbox from "./MultiSelectCheckbox";
import ConnectedRecommendationsList from "./RecommendationsList";
import { handleAddToWishList } from "../../actions/users";

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
      excludedGames: [],
      platforms: [
        { label: "PC", id: 6, checked: false },
        { label: "XBox One", id: 49, checked: false },
        { label: "PS4", id: 48, checked: false },
        { label: "Nintendo Switch", id: 130, checked: false },
        { label: "PS3", id: 9, checked: false },
        { label: "XBox 360", id: 12, checked: false }
      ]
    };
  }

  componentDidMount() {
    // Loads some recs on initial load
    this.loadRecs();
    this.loadExcludedRecs();
  }

  // make sure something is updating loading to true before you call this func
  loadExcludedRecs() {
    const { token } = this.props;
    axios({
      url: `${API_BASE_URL}/users/excludedgames`,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const excludedGames = res.data;
        this.setState({ excludedGames });
      })
      .catch(err => {
        this.setState({ error: err.message, isLoading: false });
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
          const { scope, dateNumber, timeFrame, platforms } = this.state;
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
            .slice(0, scope)
            .map(motive => motive.name);
          return axios({
            url: `${API_BASE_URL}/users/recs`,
            method: "POST",
            data: {
              motivations: final,
              dateNumber,
              timeFrame,
              platforms
            },
            headers: { Authorization: `Bearer ${token}` }
          });
        })
        .then(results => {
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
    this.loadExcludedRecs();
  }

  handleRemoveExcluded(id) {
    this.setState({ isLoading: true }, () => {
      const { token } = this.props;
      axios
        .put(
          `${API_BASE_URL}/users/removeexcluded`,
          {
            excludedId: id
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.setState(prevState => ({
            excludedGames: prevState.excludedGames.filter(rec => rec.id !== id)
          }));
        })
        .then(() => {
          this.loadExcludedRecs();
          this.loadRecs();
        })
        .catch(err => {
          this.setState({ error: err.message, isLoading: false });
        });
    });
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
    const dateNumber = id === "All time" ? 100 : id === "10 years" ? 10 : 1;
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

  handleAddToWishList(id) {
    const { dispatch } = this.props;
    dispatch(handleAddToWishList(id));
  }

  render() {
    const {
      dateNumber,
      error,
      isLoading,
      recs,
      showModal,
      igdbId,
      showMoreRecs,
      excludedGames,
      platforms,
      timeFrame
    } = this.state;
    const { screenWidth, loading, user } = this.props;
    const iconSize = screenWidth <= 576 ? "is-small" : undefined;

    const showMoreBtn =
      recs.length > 5 ? (
        <div className="game-container text-center mt-8">
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
      ) : null;

    return (
      <div>
        <Modal
          item="recommendations?"
          showModal={showModal}
          igdbId={igdbId}
          handleModal={() => this.handleModal()}
          onRemove={id => this.handleExcludeRec(id)}
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
                  timeFrame === "Months" ? "is-primary" : ""
                } mx-4`}
                id="1 month"
                onClick={e => this.handleTimeFrame(e)}
              >
                1 Month
              </button>
              <button
                type="button"
                className={`nes-btn ${
                  dateNumber === 1 && timeFrame === "Years" ? "is-primary" : ""
                } mx-4`}
                id="1 year"
                onClick={e => this.handleTimeFrame(e)}
              >
                1 Year
              </button>
              <button
                type="button"
                className={`nes-btn ${
                  dateNumber === 10 ? "is-primary" : ""
                } mx-4`}
                id="10 years"
                onClick={e => this.handleTimeFrame(e)}
              >
                10 Years
              </button>
              <button
                type="button"
                className={`nes-btn ${
                  dateNumber > 10 ? "is-primary" : ""
                } mx-4`}
                id="All time"
                onClick={e => this.handleTimeFrame(e)}
              >
                All Time
              </button>
            </div>
            <div className="m-4">
              <h3>Platforms</h3>
              <p className="text-xs">
                (Hint: For all platforms, leave unchecked.)
              </p>
              <MultiselectCheckbox
                options={platforms}
                onChange={() => {
                  this.loadRecs();
                }}
              />
            </div>
          </div>
        </div>
        <div className="game-container mx-auto mt-16">
          {!loading && !isLoading && (
            <ConnectedRecommendationsList
              user={user}
              recs={recs}
              showMoreRecs={showMoreRecs}
              isLoading={isLoading}
              openModal={id => this.handleModal(id)}
              onAddToWishList={id => this.handleAddToWishList(id)}
            />
          )}
          {!isLoading && showMoreBtn}
          <ExcludedGames
            onRemoveExcluded={id => this.handleRemoveExcluded(id)}
            screenWidth={screenWidth}
            excludedGames={excludedGames}
          />
        </div>
        <hr />
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && (
          <div className="loading-screen">
            <Loading />
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
  screenWidth: state.window.width,
  wishList: state.user.wishList,
  user: state.auth.currentUser
});

export default connect(mapStateToProps)(RecommendationsPage);
