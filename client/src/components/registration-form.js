import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';

const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, firstName, lastName } = values;
    const user = { username, password, firstName, lastName };
    return this.props
      .dispatch(registerUser(user))
      .then(() =>
        this.props.dispatch(login(username, password, firstName, lastName))
      );
  }

  render() {
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <Field
          component={Input}
          label="first name"
          type="text"
          name="firstName"
        />

        <Field
          component={Input}
          label="last name"
          type="text"
          name="lastName"
        />

        <Field
          component={Input}
          type="text"
          name="username"
          label="username"
          validate={[required, nonEmpty, isTrimmed]}
        />

        <Field
          component={Input}
          type="password"
          name="password"
          label="password"
          validate={[required, passwordLength, isTrimmed]}
        />

        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          label="confirm password"
          validate={[required, nonEmpty, matchesPassword]}
        />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
        >
          Register
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
