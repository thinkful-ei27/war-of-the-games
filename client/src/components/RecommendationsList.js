import React, { Component } from "react";
import Rec from "./Rec";
import { loadWishList } from "../actions/users";
import Loading from "./loading";

export default class RecommendationsList extends Component {
  componentDidMount() {
    // const { dispatch, user } = this.props
    // loadwishlist from redux state
  }

  // wishListCheck() {
  //   // const { recs, wishlist } = this.props
  //   // if rec has an index in wish list (index >= 0)
  //   // we want the remove btn
  //   // else we want the add btn
  // }

  render() {
    const {
      recs,
      showMoreRecs,
      isLoading,
      openModal,
      onAddToWishList
    } = this.props;
    const topFiveRecs = recs.slice(0, 5);
    const moreRecs = recs.length ? (
      recs
        .slice(5)
        .map(rec => (
          <Rec
            key={rec.id}
            game={rec}
            openModal={id => openModal(id)}
            onAddToWishList={id => onAddToWishList(id)}
          />
        ))
    ) : (
      <div>No more recommendations</div>
    );

    if (isLoading) {
      return <Loading />;
    }
    return (
      <div>
        {topFiveRecs.length
          ? topFiveRecs.map(rec => {
              return (
                <Rec
                  key={rec.id}
                  game={rec}
                  openModal={id => openModal(id)}
                  onAddToWishList={id => onAddToWishList(id)}
                />
              );
            })
          : !isLoading && (
              <div className="text-center">
                No recommendations for you ¯\_(ツ)_/¯
              </div>
            )}
        {showMoreRecs ? moreRecs : undefined}
      </div>
    );
  }
}
