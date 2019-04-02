import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "./input";
import Loading from "./loading";
import { login } from "../actions/auth";
import { required, nonEmpty } from "../validators";

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
      <div>
        <form
          className="login-form"
          onSubmit={handleSubmit(values => this.onSubmit(values))}
        >
          {err}
          <Field
            component={Input}
            type="text"
            label="username"
            name="username"
            id="username"
            validate={[required, nonEmpty]}
          />
          <Field
            component={Input}
            type="password"
            label="password"
            name="password"
            id="password"
            validate={[required, nonEmpty]}
          />
          <button type="submit" disabled={pristine || submitting}>
            Log in
          </button>
        </form>
        {loadingView}
      </div>
    );
  }
}

const connectMapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

LoginForm = connect(connectMapStateToProps)(LoginForm);
export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
