import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config";
import ConnectedGame from "./Game";
import Loading from "./loading";

export class WishListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: false,
      wishList: []
    };
  }

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.loadWishList();
    }
  }

  loadWishList() {
    const { token, username } = this.props;
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

  handleRemoveFromWishList(id) {}

  render() {
    const { screenWidth } = this.props;
    const { wishList, isLoading, error } = this.state;
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
        return <ConnectedGame key={id} {...props} />;
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
          <i className="nes-icon heart" />
          <h1>Wish List</h1>
          <i className="nes-icon heart" />
        </div>
        <div className="flex justify-start content-start flex-wrap mt-16">
          {wishListGames}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.authToken,
  screenWidth: state.window.width,
  isLoggedIn: state.auth.currentUser !== null,
  username: state.auth.currentUser.username
});

export default connect(mapStateToProps)(WishListPage);
