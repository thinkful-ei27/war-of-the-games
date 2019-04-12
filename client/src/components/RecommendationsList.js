import React, { Component } from "react";
import { connect } from "react-redux";
import Rec from "./Rec";
import { loadWishList, handleAddToWishList } from "../actions/users";
import Loading from "./loading";

const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

export class RecommendationsList extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;
    const { username } = user;

    dispatch(loadWishList(username));
  }

  wishListCheck(rec) {
    const { wishList, onAddToWishList, dispatch } = this.props;
    if (wishList.length && rec) {
      const newWishList = reducedFilter(
        wishList,
        ["id"],
        item => item.id === rec.id
      );
      if (newWishList.length < 1) {
        console.log("ITS NOT IN WISHLIST", wishList);
        return (
          <button
            onClick={() => dispatch(handleAddToWishList(rec.id || rec.igdb.id))}
            type="button"
            className="nes-btn is-success wishlist-btn"
          >
            <i className="nes-icon heart is-small" />
            Add to Wishlist
          </button>
        );
      }
      console.log("ITS IN WISHLIST");
      return (
        <button
          onClick={() => onAddToWishList(rec.id || rec.igdb.id)}
          type="button"
          className="nes-btn is-error wishlist-btn"
        >
          <i className="nes-icon heart is-empty is-small" />
          Remove from Wishlist
        </button>
      );
    }
  }

  render() {
    const {
      recs,
      showMoreRecs,
      isLoading,
      openModal,
      onAddToWishList,
      wishList
    } = this.props;
    console.log(wishList);
    const topFiveRecs = recs.slice(0, 5);
    const moreRecs = recs.length ? (
      recs.slice(5).map(rec => {
        const wishListBtn = this.wishListCheck(rec);
        return (
          <Rec
            wishListBtn={wishListBtn}
            key={rec.id}
            game={rec}
            openModal={id => openModal(id)}
            onAddToWishList={id => onAddToWishList(id)}
          />
        );
      })
    ) : (
      <div>No more recommendations</div>
    );

    if (isLoading) {
      return (
        <div className="loading-screen">
          <Loading />
        </div>
      );
    }
    return (
      <div>
        {topFiveRecs.length ? (
          topFiveRecs.map(rec => {
            const wishListBtn = this.wishListCheck(rec);
            return (
              <Rec
                wishListBtn={wishListBtn}
                key={rec.id}
                game={rec}
                openModal={id => openModal(id)}
                onAddToWishList={id => onAddToWishList(id)}
              />
            );
          })
        ) : (
          <div className="text-center">
            No recommendations for you ¯\_(ツ)_/¯
          </div>
        )}
        {showMoreRecs ? moreRecs : undefined}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wishList: state.user.wishList
});

export default connect(mapStateToProps)(RecommendationsList);
