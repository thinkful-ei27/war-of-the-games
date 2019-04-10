import React from 'react'
import { Link, Redirect } from 'react-router-dom';

export default function OnboardingPrompt(props) {
  return (
    <section className="section-404">
      <div className="box-onboarding">
        <div className="onboarding-box">
          <div className="onboarding-display">
            <p className="onboarding-text">WAR OF THE GAMES</p>
          </div>
        </div>
        <nav className="onboarding-nav">
          <Link to="/register" className="onboard-signup-btn" >
            <button
              id="sign-up-prompt-btn "
              className="nes-btn is-primary "
              type="button"
            >
              Sign up
          </button>
          </Link>
          <Link to="/login">
            <button
              id="sign-up-prompt-btn"
              className="nes-btn is-primary "
              type="button"
            >
              Log in
          </button>
          </Link>
        </nav>
        <p>Don't Let Your Votes Go to Waste! Sign Up to Get Recommendations </p>
        <div className="bricks-onboarding-holder-2"></div>
      </div>
    </section>
  )
}