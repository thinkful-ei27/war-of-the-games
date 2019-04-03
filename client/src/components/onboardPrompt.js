import React from 'react'
import { Link } from 'react-router-dom';
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
          <Link to="/register">
            <button
              id="sign-up-prompt-btn"
              className="nes-btn is-primary"
              type="button"
            >
              Sign up
          </button>
          </Link>
          <Link to="/login">
            <button
              id="sign-up-prompt-btn"
              className="nes-btn is-primary"
              type="button"
            >
              Log in
          </button>
          </Link>
        </nav>
        <p>Sign Up To Get Recommendations and See How Other Users Feel!</p>
        <div className="bricks-onboarding-holder-2"></div>
      </div>
    </section>
  )
}