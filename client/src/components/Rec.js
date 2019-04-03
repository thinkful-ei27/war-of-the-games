import React from "react";

export default function Rec(props) {
  const { cloudImage, slug, name, summary } = props.game;
  return (
    <section className="nes-container is-dark flex flex-row">
      <div className="">
        <img className="rec-img" src={cloudImage} alt={slug} />
      </div>
      <div className="profile flex flex-col">
        <h4>{name}</h4>
        <p className="text-xs">{summary}</p>
        <button className="nes-btn is-primary">></button>
        {/* <div className="links">
          <p>Was this recommendation useful?</p>
        </div> */}
      </div>
    </section>
  );
}
