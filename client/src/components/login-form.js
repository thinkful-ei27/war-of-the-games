import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';

class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      return <Redirect to="/profile" />;
    }
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        {error}
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
        <button disabled={this.props.pristine || this.props.submitting}>
          Log in
        </button>
      </form>
    );
  }
}

const connectMapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

LoginForm = connect(connectMapStateToProps)(LoginForm);
export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
