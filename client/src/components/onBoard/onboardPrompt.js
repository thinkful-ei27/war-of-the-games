import React from "react";
import { Link } from "react-router-dom";
import "../styles/onboarding.css";

export default function OnboardingPrompt() {
  return (
    <section className="section-404">
      <div className="box-onboarding">
        <div className="onboarding-box">
          <div className="onboarding-display">
            <h1 className="onboarding-text">WAR OF THE GAMES</h1>
          </div>
        </div>
        <nav className="onboarding-nav">
          <Link to="/register" className="onboard-signup-btn">
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
        <p>
          Don&#39;t Let Your Votes Go to Waste! Sign Up to Get Recommendations
        </p>
        <div className="bricks-onboarding-holder-2" />
      </div>
    </section>
  );
}
