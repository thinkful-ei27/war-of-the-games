import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { registerUser } from "../actions/users";
import { Link } from "react-router-dom";
import { login } from "../actions/auth";
import Input from "./input";
import Input2 from "./input2";
import "./styles/sprites.css";
import { required, nonEmpty, matches, length, isTrimmed } from "../validators";

const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches("password");

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, firstName, lastName, profilePic } = values;
    const user = { username, password, firstName, lastName, profilePic };
    const { dispatch } = this.props;
    return dispatch(registerUser(user)).then(() =>
      dispatch(login(username, password, firstName, lastName, profilePic))
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
          placeholder="first name"
          className="form-field"
          component={Input}
          aria-label="first name"
          type="text"
          name="firstName"
        />

        <Field
          placeholder="last name"
          className="form-field"
          component={Input}
          aria-label="last name"
          type="text"
          name="lastName"
        />

        <Field
          placeholder="username"
          className="form-field"
          component={Input}
          type="text"
          name="username"
          aria-label="username"
          validate={[required, nonEmpty, isTrimmed]}
        />

        <Field
          className="form-field"
          component={Input}
          value="password"
          type="password"
          name="password"
          aria-label="password"
          placeholder="password"
          validate={[required, passwordLength, isTrimmed]}
        />

        <Field
          placeholder="confirm password"
          className="form-field"
          component={Input}
          type="password"
          name="passwordConfirm"
          aria-label="confirm password"
          validate={[required, nonEmpty, matchesPassword]}
        />

        <div className="profile-selector form-input">
          <h3 className="avatar-header">Select an Avatar</h3>
          <Field
            id="demon"
            name="profilePic"
            className="avatar demon"
            component={Input2}
            type="radio"
            value="Demon"
            htmlFor="demon"
          />

          <Field
            id="knight"
            name="profilePic"
            className="avatar knight"
            htmlFor="knight"
            type="radio"
            value="Knight"
            component={Input2}
          />

          <Field
            id="bigZombie"
            name="profilePic"
            className="avatar bigZombie"
            htmlFor="bigZombie"
            component={Input2}
            type="radio"
            value="BigZombie"
          />

          <Field
            id="femaleElf"
            name="profilePic"
            className="avatar femaleElf"
            htmlFor="femaleElf"
            component={Input2}
            type="radio"
            value="FemaleElf"
          />

          <Field
            id="femaleWizard"
            name="profilePic"
            className="avatar femaleWizard"
            htmlFor="femaleWizard"
            component={Input2}
            type="radio"
            value="FemaleWizard"
          />

          <Field
            id="maleElf"
            name="profilePic"
            className="avatar maleElf"
            htmlFor="maleElf"
            component={Input2}
            type="radio"
            value="MaleElf"
          />

          <Field
            id="maleWizard"
            name="profilePic"
            className="avatar maleWizard"
            htmlFor="maleWizard"
            component={Input2}
            type="radio"
            value="MaleWizard"
          />

          <Field
            id="ogre"
            name="profilePic"
            className="avatar ogre"
            htmlFor="ogre"
            component={Input2}
            type="radio"
            value="Ogre"
          />

          <Field
            id="shaman"
            name="profilePic"
            className="avatar shaman"
            htmlFor="shaman"
            component={Input2}
            type="radio"
            value="Shaman"
          />
        </div>
        <button type="submit" disabled={pristine || submitting}>
          Register
        </button>
        <Link to="/login" className="login-link">Login</Link>
      </form>
    );
  }
}

export default reduxForm({
  form: "registration",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("registration", Object.keys(errors)[0]))
})(RegistrationForm);
