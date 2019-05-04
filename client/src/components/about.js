import React from "react";
import { connect } from "react-redux";
import demon from "../assets/demon.png";
import knight from "../assets/knight.png";
import "./styles/about.css";
import "./styles/onboarding.css";

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
      <section className="about-page-text">
        <p>{textOne}</p>
        <p>{textTwo}</p>
      </section>
    );
  }

  return (
    <div className="box-onboarding">
      <section className="onboarding-box">
        <div className="onboarding-display">
          <h1 className="onboarding-text">{title}</h1>
        </div>
      </section>
      <section className="about-page-text-section">{content}</section>
      <section className="about-page-btns">
        <img className="about-img" src={demon} alt="demon" />
        <a
          className="nes-btn is-warning"
          href="https://github.com/thinkful-ei27/war-of-the-games"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check out our code on GitHub
        </a>
        <img className="about-img" src={knight} alt="knight" />
      </section>
      <div className="bricks-onboarding-holder-2" />
    </div>
  );
}

const mapStateToProps = state => ({
  screenWidth: state.window.width
});

export default connect(mapStateToProps)(AboutPage);
