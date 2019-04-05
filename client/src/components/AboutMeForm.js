import React, { Component } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { postUserAboutMe } from "../actions/users";
import LongText from "./LongText";

class AboutMeFrom extends Component {
  state = {
    submitSucceeded: false,
    isEditing: false
  };

  handleSubmit(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    this.setState({ submitSucceeded: true, isEditing: false });
    dispatch(postUserAboutMe(e.target.aboutMe.value));
  }
  render() {
    const { aboutMe, screenWidth } = this.props;
    const { submitSucceeded, isEditing } = this.state;
    const isMobile = screenWidth <= 768;
    console.log(this.state);
    const aboutMeWithContent = (
      <div>
        <button
          type="reset"
          onClick={() =>
            this.setState({ submitSucceeded: false, isEditing: true })
          }
        >
          Edit About me
        </button>
        <p className="about-me">{aboutMe}</p>
      </div>
    );
    const unSubmittedForm = (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="textarea_field">Write about yourself</label>
        <textarea id="textarea_field" name="aboutMe" className="nes-textarea" />
        <button type="submit" className="nes-btn is-warning">
          Submit
        </button>
      </form>
    );

    return aboutMe && !isEditing
      ? aboutMeWithContent
      : isMobile && aboutMe
      ? aboutMeWithContent
      : !submitSucceeded
      ? unSubmittedForm
      : aboutMeWithContent;
  }
}

export default connect()(AboutMeFrom);
