import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "./input";
import Loading from "./loading";
import { login } from "../actions/auth";
import { required, nonEmpty } from "../validators";
import warpPipe from "../assets/short-warp-pipe.png";
import pirhanaPipe from "../assets/pirhana-pipe.png";

class LoginForm extends React.Component {
  onSubmit(values) {
    const { dispatch } = this.props;
    return dispatch(login(values.username, values.password));
  }

  render() {
    const {
      loggedIn,
      loading,
      error,
      handleSubmit,
      pristine,
      submitting
    } = this.props;

    if (loggedIn) {
      return <Redirect to="/profile" />;
    }

    let err;
    if (error) {
      err = (
        <div className="form-error" aria-live="polite">
          {error}
        </div>
      );
    }

    let loadingView;
    if (loading) {
      loadingView = <Loading intervalSpeed={25} incrementBy={3} size="md" />;
    }

    return (
      <div className="login-form-container">
        <div className="bricks-onboarding-holder-3" />
        <h2 className="signup-header">Welcome Back!</h2>
        <div className="form-holder2">
          <form
            className="login-form"
            onSubmit={handleSubmit(values => this.onSubmit(values))}
          >
            {err}

            <Field
              className="nes-input"
              placeholder="username"
              component={Input}
              type="text"
              aria-label="username"
              name="username"
              id="username"
              validate={[required, nonEmpty]}
            />
            <Field
              className="nes-input"
              placeholder="password"
              component={Input}
              type="password"
              aria-label="password"
              name="password"
              id="password"
              validate={[required, nonEmpty]}
            />
            <button
              className={`nes-btn is-primary ${pristine ? "is-disabled" : ""}`}
              type="submit"
              disabled={pristine || submitting}
            >
              Log in
            </button>
          </form>

          {loadingView}
        </div>
        <div className="pipe-div">
          <img src={warpPipe} alt="warp-pipe" className="warp-pipe" />
          <img src={pirhanaPipe} alt="pirhana-pipe" className="pirhana-pipe" />
        </div>
        <div className="bricks-onboarding-holder-4" />
      </div>
    );
  }
}

const connectMapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

// eslint-disable-next-line no-class-assign
LoginForm = connect(connectMapStateToProps)(LoginForm);
export default reduxForm({
  form: "login",
  onSubmitFail: (errors, dispatch) => dispatch(focus("login", "username"))
})(LoginForm);
