import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { registerUser } from "../actions/users";
import { login } from "../actions/auth";
import Input from "./input";
import './styles/sprites.css'
import Sprites from './Sprites';
import { required, nonEmpty, matches, length, isTrimmed } from "../validators";

const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches("password");

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, firstName, lastName } = values;
    const user = { username, password, firstName, lastName };
    const { dispatch } = this.props;
    return dispatch(registerUser(user)).then(() =>
      dispatch(login(username, password, firstName, lastName))
    );
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form
        className="login-form"
        onSubmit={handleSubmit(values => this.onSubmit(values))}
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
        <div className='profile-selector'>
          <label>Select an Avatar</label>
          <label className="avatar demon" htmlFor="demon">
            <Field
              className="avatar demon"
              name="profile-pic"
              component={Input}
              type="radio"
              value="demon"
            />
          </label>
          <label className="avatar knight" htmlFor="knight">
            <Field
              className="avatar knight"
              name="profile-pic"
              component={Input}
              type="radio"
              value="knight"
            />
          </label>
        </div>
        <button type="submit" disabled={pristine || submitting}>
          Register
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "registration",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("registration", Object.keys(errors)[0]))
})(RegistrationForm);
