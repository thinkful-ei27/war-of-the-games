import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Card from "./card";

import LoginForm from "./login-form";

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    // <div className="home">
    //     <h2>Welcome to Foo App</h2>
    //     <LoginForm />
    //     <Link to="/register">Register</Link>
    // </div>
    <div className="battle-container">
      <Card
        src="https://webgames.host/uploads/2017/06/legend-of-zelda-ocarina-of-time.png"
        alt="Zelda: Ocarina of Time cover"
      />
      <span className="vs">VS</span>
      <Card
        src="https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Supersmashbox.jpg/220px-Supersmashbox.jpg"
        alt="Super Smash Bros cover"
      />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
