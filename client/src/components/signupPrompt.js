import React from "react";
import { connect } from "react-redux";
import { Route, Link } from 'react-router-dom';
import cyberpunk from '../assets/cyberpunk-street.png'
import './styles/signupPrompt.css'

export class SignupPrompt extends React.Component {
  render() {
    return (
      <div className="sign-up-prompt">
        <div class="nes-container is-rounded is-dark">
          <p>Create an Account to Get Back to Voting!</p>
        </div>
        <Link to="/register">
          <button
            id="sign-up-prompt-btn"
            className="nes-btn is-primary"
            type="button">
            Sign up
          </button>
        </Link>
      </div>
    )
  }
}