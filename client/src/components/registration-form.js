import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { registerUser } from "../actions/users";
import { login } from "../actions/auth";
import Input from "./input";
import Input2 from "./input2"
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

        <div className="profile-selector form-input">
          <Field
            id="demon"
            name="profile-pic"
            className="avatar demon"
            component={Input2}
            type="radio"
            value="demon"
            htmlFor="demon" />

          <Field
            id="knight"
            name="profile-pic"
            className="avatar knight"
            htmlFor="knight"
            type="radio"
            value="knight"
            component={Input2} />


          <Field
            id="bigZombie"
            name="profile-pic"
            className="avatar bigZombie"
            htmlFor="bigZombie"
            className="avatar bigZombie"
            htmlFor="bigZombie"
            component={Input2}
            type="radio"
            value="bigZombie" />


          <Field
            id="femaleElf"
            name="profile-pic"
            className="avatar femaleElf"
            htmlFor="femaleElf"
            component={Input2}
            type="radio"
            value="femaleElf" />


          <Field
            id="femaleWizard"
            name="profile-pic"
            className="avatar femaleWizard"
            htmlFor="femaleWizard"
            component={Input2}
            type="radio"
            value="femaleWizard" />


          <Field
            id="maleElf"
            name="profile-pic"
            className="avatar maleElf"
            htmlFor="maleElf"
            component={Input2}
            type="radio"
            value="maleElf" />


          <Field
            id="maleWizard"
            name="profile-pic"
            className="avatar maleWizard"
            htmlFor="maleWizard"
            component={Input2}
            type="radio"
            value="maleWizard" />


          <Field
            id="ogre" name="profile-pic"
            className="avatar ogre"
            htmlFor="ogre"
            component={Input2}
            type="radio"
            value="ogre" />


          <Field
            id="shaman"
            name="profile-pic"
            className="avatar shaman"
            htmlFor="shaman"
            component={Input2}
            type="radio"
            value="shaman" />


          <Field
            id="angel"
            name="profile-pic"
            className="avatar angel"
            htmlFor="angel"
            component={Input2}
            type="radio"
            value="angel" />

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
