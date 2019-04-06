import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "./Modal";
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
      recs: [],
      showModal: false,
      igdbId: null
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

  render() {
    const { error, isLoading, recs, showModal, igdbId } = this.state;
    const topFiveRecs = recs.slice(0, 5);

    return (
      <div>
        <Modal
          showModal={showModal}
          igdbId={igdbId}
          handleModal={() => this.handleModal()}
          handleExcludeRec={id => this.handleExcludeRec(id)}
        />
        <h1 className="text-center mt-16">
          <i className="nes-icon coin" />
          Recommendations
          <i className="nes-icon coin" />
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
