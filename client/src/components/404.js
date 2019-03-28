import React from 'react'
import { Link } from 'react-router-dom';
import './styles/404.css'
export default class Page404 extends React.Component {
  render() {
    return (
      <section className="section-404">
        <div className="box-404">
          <div className="bricks-404-holder"></div>
          <p className="text-404">Thanks for Visiting! But the Princess err... Content is in Another Castle</p>
          <Link to='/'>
            <button type="button" className="nes-btn is-error">
              Back to Vote
          </button>
          </Link>
          <div className="bricks-404-holder-2"></div>
        </div>
      </section>
    )
  }
}