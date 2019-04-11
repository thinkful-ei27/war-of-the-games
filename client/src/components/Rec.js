import React from "react";
import { Link } from "react-router-dom";
import LongText from "./LongText";
import Logo from "../assets/favicon3.ico";

export default function Rec(props) {
  const { game, openModal, onAddToWishList } = props;
  const { igdb, name, summary, slug, cover, id } = game;
  const url = `/games/${slug || igdb.slug}`;

  return (
    <section className="nes-container is-dark flex game-recommendation">
      <button
        type="button"
        onClick={() => openModal(id || igdb.id)}
        className="rec-delete"
      >
        X
      </button>
      <div className="mx-4">
        <img
          className="img-responsive rec-img"
          src={cover ? cover.url : Logo}
          alt={slug}
        />
      </div>
      <div className="profile flex flex-col">
        <Link to={url}>
          <h3>{name}</h3>
        </Link>
        <LongText content={summary} limit={250} />
        <div className="mt-4">
          <button
            onClick={() => onAddToWishList(id || igdb.id)}
            type="button"
            className="nes-btn is-success wishlist-btn"
          >
            <i className="nes-icon heart is-small" />
            Add to Wishlist
          </button>
        </div>
      </div>
    </section>
  );
}
