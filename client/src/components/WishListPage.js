import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config";
import ConnectedGame from "./Game";
import Loading from "./loading";
import Modal from "./Modal";
import "./styles/wishList.css";

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
    const { username } = this.props.match.params;
    this.loadWishList(username);
  }

  loadWishList(username) {
    const { token } = this.props;
    this.setState({ isLoading: true }, () => {
      axios({
        url: `${API_BASE_URL}/users/wishlist/${username}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const wishList = res.data;
          this.setState({ wishList, isLoading: false });
        })
        .catch(err => {
          this.setState({ error: err.message, isLoading: false });
        });
    });
  }

  handleRemoveFromWishList(id) {
    const { token } = this.props;
    const { username } = this.props.match.params;
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
        .then(() => this.loadWishList(username))
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
    const { screenWidth } = this.props;
    const { wishList, isLoading, error, showModal, igdbId } = this.state;
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
            onRemoveGame={id => this.handleModal(id)}
            key={id}
            {...props}
          />
        );
      });
    } else {
      return isLoading ? (
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
            item="Wish List"
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
  token: state.auth.authToken,
  screenWidth: state.window.width
});

export default connect(mapStateToProps)(WishListPage);
