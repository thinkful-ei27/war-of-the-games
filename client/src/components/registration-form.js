import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { registerUser } from "../actions/users";
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
          className="form-field nes-input"
          component={Input}
          aria-label="first name"
          type="text"
          name="firstName"
          validate={[required]}
        />

        <Field
          placeholder="last name"
          className="form-field nes-input"
          component={Input}
          aria-label="last name"
          type="text"
          name="lastName"
          validate={[required]}
        />

        <Field
          placeholder="username"
          className="form-field nes-input"
          component={Input}
          type="text"
          name="username"
          aria-label="username"
          validate={[required, nonEmpty, isTrimmed]}
        />

        <Field
          className="form-field nes-input"
          component={Input}
          value="password"
          type="password"
          name="password"
          aria-label="password"
          placeholder="password"
          validate={[required, passwordLength, isTrimmed]}
        />

        <Field
          className="form-field nes-input"
          placeholder="confirm password"
          component={Input}
          type="password"
          name="passwordConfirm"
          aria-label="confirm password"
          validate={[required, nonEmpty, matchesPassword]}
        />

        <div className="profile-selector form-input nes-container is-dark with-title is-centered">
          <h3 className="avatar-header title">Select Avatar</h3>
          <ul className="profile-selector__avatars">
            <li>
              <Field
                id="nes-ash"
                name="profilePic"
                className="avatar nes-ash"
                htmlFor="nes-ash"
                type="radio"
                value="nes-ash"
                component={Input2}
              />
            </li>
            <li>
              <Field
                id="nes-mario"
                name="profilePic"
                className="avatar nes-mario"
                htmlFor="nes-mario"
                component={Input2}
                type="radio"
                value="nes-mario"
              />
            </li>
            <li>
              <Field
                id="nes-pokeball"
                name="profilePic"
                className="avatar nes-pokeball"
                htmlFor="nes-pokeball"
                component={Input2}
                type="radio"
                value="nes-pokeball"
              />
            </li>
            <li>
              <Field
                id="nes-bulbasaur"
                name="profilePic"
                className="avatar nes-bulbasaur"
                htmlFor="nes-bulbasaur"
                component={Input2}
                type="radio"
                value="nes-bulbasaur"
              />
            </li>
            <li>
              <Field
                id="nes-charmander"
                name="profilePic"
                className="avatar nes-charmander"
                htmlFor="nes-charmander"
                component={Input2}
                type="radio"
                value="nes-charmander"
              />
            </li>
            <li>
              <Field
                id="nes-squirtle"
                name="profilePic"
                className="avatar nes-squirtle"
                htmlFor="nes-squirtle"
                component={Input2}
                type="radio"
                value="nes-squirtle"
              />
            </li>
            <li>
              <Field
                id="nes-kirby"
                name="profilePic"
                className="avatar nes-kirby"
                htmlFor="nes-kirby"
                component={Input2}
                type="radio"
                value="nes-kirby"
              />
            </li>
            <li>
              <Field
                id="lich-king"
                name="profilePic"
                className="avatar lich-king"
                htmlFor="lich-king"
                component={Input2}
                type="radio"
                value="lich-king"
              />
            </li>
            <li>
              <Field
                id="gen-sonic"
                name="profilePic"
                className="avatar gen-sonic"
                htmlFor="gen-sonic"
                component={Input2}
                type="radio"
                value="gen-sonic"
              />
            </li>
            <li>
              <Field
                id="excitebike"
                name="profilePic"
                className="avatar excitebike"
                htmlFor="excitebike"
                component={Input2}
                type="radio"
                value="excitebike"
              />
            </li>
            <li>
              <Field
                id="cloud-strife"
                name="profilePic"
                className="avatar cloud-strife"
                htmlFor="cloud-strife"
                component={Input2}
                type="radio"
                value="cloud-strife"
              />
            </li>
            <li>
              <Field
                id="master-chief"
                name="profilePic"
                className="avatar master-chief"
                htmlFor="master-chief"
                component={Input2}
                type="radio"
                value="master-chief"
              />
            </li>
          </ul>
        </div>
        <button
          className={`nes-btn is-primary ${pristine ? "is-disabled" : ""}`}
          type="submit"
          disabled={pristine || submitting}
        >
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
