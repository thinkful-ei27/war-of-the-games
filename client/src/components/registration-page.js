import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Loading from "./loading";

import RegistrationForm from "./registration-form";

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
    <div className="home">
      <h2>Register for Foo App</h2>
      <RegistrationForm />
      <Link to="/">Login</Link>
      {loadingView}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(RegistrationPage);
