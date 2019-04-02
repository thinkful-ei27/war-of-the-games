import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import demon from "../assets/demon.png";
import knight from "../assets/knight.png";
import "./styles/about.css";

export function AboutPage(props) {
  const { screenWidth } = props;
  let title = "WotG";

  if (screenWidth > 600) {
    title = "War of the Games";
  }

  return (
    <div className="about-container">
      <section className="about-page-section">
        <div className="about-page-div">
          <i className="snes-logo" />
          <h1>{title}</h1>
          <i className="snes-logo" />
        </div>
      </section>
      <section className="about-page-text-section">
        <p className="about-page-text">
          War of the Games pits games from beloved classics to modern
          masterpieces against each other, and shows you how other people feel
          about that game. Never heard of a game? No worries! We've got you
          covered with everything you've ever wanted to know about a title,
          including review scores! (Recomendations coming soon...)
        </p>
      </section>
      <section className="about-page-btns">
        <Link to="/">
          <img className="about-img" src={demon} alt="demon" />
          <button type="button" className="nes-btn is-success">
            Get back to the action!
          </button>
          <img className="about-img" src={knight} alt="knight" />
        </Link>
      </section>
    </div>
  );
}

const mapStateToProps = state => ({
  screenWidth: state.window.width
});

export default connect(mapStateToProps)(AboutPage);
