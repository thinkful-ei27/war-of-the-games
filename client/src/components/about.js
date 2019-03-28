import React from 'react';
import { Link } from 'react-router-dom';
import demon from '../assets/demon.png'
import knight from '../assets/knight.png'
import './styles/about.css'
export default class AboutPage extends React.Component {
  render() {
    return (
      <>
        <section className="about-page-section">
          <div className="about-page-div">
            <i className="snes-logo"></i>
            <h1>War of the Games</h1>
            <i className="snes-logo"></i>
          </div>
        </section>
        <section className="about-page-text-section">
          <p className="about-page-text">
            War of the Games pits games from beloved classics to modern masterpieces against each other,
            and shows you how other people feel about that game. Never heard of a game? No worries! We've got
            you covered with everything you've ever wanted to know about a title, including review scores!
            (Recomendations coming soon...)
          </p>
        </section>
        <section className="about-page-btns">
          <Link to="/">
            <img className="about-img" src={demon} />
            <button type="button" className="nes-btn is-success">Get back to the action!</button>
            <img className="about-img" src={knight} />
          </Link>
        </section>
      </>
    )
  }
}