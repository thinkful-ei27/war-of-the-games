import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import ConnectedGame from "../gamePage/Game";
import Loading from "../loading";
import Modal from "../Modal";
import { loadWishList, fetchByUsername } from "../../actions/users";
import "../styles/wishList.css";

export class WishListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: false,
      wishList: [],
      showModal: false,
      igdbId: null
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { username } = match.params;
    return dispatch(fetchByUsername(username)).then(() =>
      dispatch(loadWishList(username))
    );
  }

  handleRemoveFromWishList(id) {
    const { match, token, dispatch } = this.props;
    const { username } = match.params;
    this.setState({ isLoading: true }, () => {
      axios
        .put(
          `${API_BASE_URL}/users/removewishlist`,
          {
            wishListId: id
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.setState(prevState => ({
            wishList: prevState.wishList.filter(game => game.id !== id),
            isLoading: false
          }));
          this.handleModal();
        })
        .then(() => dispatch(loadWishList(username)))
        .catch(err => {
          this.setState({ isLoading: false, error: err.message });
        });
    });
  }

  clearId() {
    this.setState({ igdbId: null });
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

  render() {
    const {
      currentUser,
      loading,
      loggedIn,
      match,
      screenWidth,
      wishList
    } = this.props;
    const { isLoading, error, showModal, igdbId } = this.state;
    const { username } = match.params;
    const isMobile = screenWidth <= 768;
    let iconSize = "is-small";
    if (!isMobile) {
      iconSize = undefined;
    }
    let wishListGames;
    if (wishList.length) {
      wishListGames = wishList.map(game => {
        const { id, name, cloudImage, igdb, slug, cover } = game;
        let coverUrl;
        if (cover) {
          const { image_id: imageId } = cover;
          coverUrl = imageId
            ? `https://images.igdb.com/igdb/image/upload/t_720p/${imageId}.jpg`
            : null;
        }
        const props = {
          name,
          cloudImage,
          igdb,
          slug,
          screenWidth,
          coverUrl,
          id,
          wishList: true
        };
        return (
          <ConnectedGame
            editable={loggedIn && currentUser.username === username}
            onRemoveGame={gameId => this.handleModal(gameId)}
            key={id}
            {...props}
          />
        );
      });
    } else {
      return isLoading || loading ? (
        <div className="game-container mx-auto mt-8 text-center">
          <Loading />
        </div>
      ) : (
        <div className="game-container mx-auto mt-8">
          You don&apos;t have any games in your wishlist. View your
          recommendations to add games to your list.
        </div>
      );
    }

    return error ? (
      <div style={{ color: "#900" }}>{error}</div>
    ) : (
      <div className="game-container mx-auto mt-8">
        <div className="flex justify-center mx-auto">
          <i className={`nes-icon heart ${iconSize}`} />
          <h1 className="wishlist-header">Wish List</h1>
          <i className={`nes-icon heart ${iconSize}`} />
        </div>
        <div className="flex justify-start content-start flex-wrap mt-16">
          <Modal
            item="Wish List?"
            showModal={showModal}
            igdbId={igdbId}
            handleModal={() => this.handleModal()}
            onRemove={id => this.handleRemoveFromWishList(id)}
          />
          {wishListGames}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loading: state.user.loading,
  loggedIn: state.auth.currentUser !== null,
  screenWidth: state.window.width,
  token: state.auth.authToken,
  wishList: state.user.wishList
});

export default connect(mapStateToProps)(WishListPage);
