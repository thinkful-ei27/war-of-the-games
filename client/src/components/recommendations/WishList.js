import React from "react";
import { Link } from "react-router-dom";
import ConnectedGame from "../gamePage/Game";

const WishList = props => {
  const { isMobile, profileWidth, username, wishList } = props;
  const topFiveWish = wishList.slice(0, 5);

  if (!wishList.length) {
    return null;
  }
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
          const innerProps = {
            name,
            cloudImage,
            igdb,
            slug,
            isMobile,
            profileWidth,
            coverUrl,
            id
          };
          return <ConnectedGame key={wish.id} {...innerProps} />;
        })}
      </div>
    </div>
  );
};

export default WishList;
