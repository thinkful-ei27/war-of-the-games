import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import demon from "../assets/demon.png";
import knight from "../assets/knight.png";
import "./styles/about.css";

export function AboutPage(props) {
  const { screenWidth } = props;
  let title = "WotG";
  const textOne = `War of the Games pits games from beloved classics to modern
  masterpieces against each other, and shows you how other people feel
  about that game.`;

  const textTwo = `Never heard of a game? No worries! We've got you covered with
  everything you've ever wanted to know about a title, including review
  scores!`;

  let content = (
    <div>
      <p className="about-page-text one">{textOne}</p>
      <p className="about-page-text two">{textTwo}</p>
    </div>
  );

  if (screenWidth > 768) {
    title = "War of the Games";
    content = (
      <p className="about-page-text">
        {textOne} {textTwo}
      </p>
    );
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
      <section className="about-page-text-section">{content}</section>
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
