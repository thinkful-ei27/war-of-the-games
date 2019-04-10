import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config";
import ConnectedGame from "./Game";
import Loading from "./loading";
import Logo from "../assets/favicon3.ico";

export class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: false,
      wishList: []
    };
  }

  componentDidMount() {
    this.loadWishList();
  }

  loadWishList() {
    this.setState({ isLoading: true }, () => {
      const { token } = this.props;
      axios({
        url: `${API_BASE_URL}/users/wishlist`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const wishList = res.data;
          console.log(wishList);
          this.setState({ wishList, isLoading: false });
        })
        .catch(err => {
          this.setState({ error: err.message, isLoading: false });
        });
    });
  }

  render() {
    const { isMobile, profileWidth, username } = this.props;
    const { wishList, isLoading, error } = this.state;
    const topFiveWish = wishList.slice(0, 5);
    return (
      <div className="rec-container">
        <Link to={`/users/${username}/wishlist`}>
          <h3 className={isMobile ? "w-3/4 mx-auto text-base mt-4" : undefined}>
            <i className="nes-icon heart" />
            Wish List &gt;
          </h3>
        </Link>
        <div
          className={`flex ${isMobile ? "flex-col text-xs w-3/4 mx-auto" : ""}`}
        >
          {topFiveWish.map(wish => {
            const { id, name, cloudImage, igdb, slug, cover } = wish;
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
              isMobile,
              profileWidth,
              coverUrl,
              id
            };
            return <ConnectedGame key={wish.id} {...props} />;
          })}
        </div>
        <hr />
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <Loading />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.authToken,
  username: state.auth.currentUser.username
});

export default connect(mapStateToProps)(WishList);
