import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loading from "../loading";
import "../styles/login-registration.css";
import ReduxFormRegistrationForm from "./registration-form";

export function RegistrationPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard

  const { loggedIn, loading } = props;
  let loadingView;
  if (loggedIn) {
    return <Redirect to="/" />;
  }

  if (loading) {
    loadingView = <Loading size="sm" />;
  }

  return (
    <div className="signup-form-container">
      <h2 className="signup-header">
        -It's Dangerous to Go Alone, Register Now!-
      </h2>
      <div className="form-holder1">
        <ReduxFormRegistrationForm />
      </div>
      {loadingView}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(RegistrationPage);
