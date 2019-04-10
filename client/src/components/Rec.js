import React from "react";
import { Link } from "react-router-dom";
import LongText from "./LongText";
import Logo from "../assets/favicon3.ico";

export default function Rec(props) {
  const { cloudImage, igdb, name, summary, slug, cover, id } = props.game;
  const { openModal } = props;
  const url = `/games/${slug || igdb.slug}`;

  return (
    <section className="nes-container is-dark flex game-recommendation">
      {/* <i
        className="nes-icon close is-small rec-delete"
        onClick={e => excludeRec(e)}
      /> */}
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
          {/* <i className="nes-icon like p-4" />
          <i className="nes-icon youtube p-4" /> */}
          <button type="button" className="nes-btn is-success wishlist-btn">
            <i className="nes-icon heart is-small" />
            Add to Wishlist
          </button>
        </div>
      </div>
    </section>
  );
}
