import React, { Component } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { postUserAboutMe } from "../../actions/users";
import LongText from "../LongText";

class AboutMe extends Component {
  state = {
    submitSucceeded: false,
    isEditing: false,
    previousAboutMe: this.props.aboutMe
  };

  handleSubmit(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    this.setState({ submitSucceeded: true, isEditing: false });
    dispatch(postUserAboutMe(e.target.aboutMe.value));
  }

  render() {
    const { aboutMe, screenWidth } = this.props;
    const { submitSucceeded, isEditing, previousAboutMe } = this.state;
    const isMobile = screenWidth <= 768;

    let nesContainer = "";
    let iconSize = "is-small";
    if (!isMobile) {
      nesContainer = "nes-container is-dark";
      iconSize = "is-medium";
    }

    const aboutMeWithContent = (
      <div>
        <button
          className="nes button is-primary"
          type="reset"
          onClick={() =>
            this.setState({ submitSucceeded: false, isEditing: true })
          }
        >
          Edit About me
        </button>
        <LongText className="nes-text-area" content={aboutMe} limit={175} />
      </div>
    );
    const unSubmittedForm = (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label className="about-me-label" htmlFor="textarea_field">
          Write about yourself{" "}
        </label>
        <span
          className="cancel"
          onClick={() => this.setState({ isEditing: false })}
        >
          X
        </span>
        <textarea
          id="textarea_field"
          name="aboutMe"
          className="nes-textarea"
          onChange={e =>
            this.setState({ previousAboutMe: e.currentTarget.value })
          }
          value={previousAboutMe}
        />
        <button type="submit" className="nes-btn is-warning">
          Submit
        </button>
      </form>
    );

    return aboutMe && !isEditing
      ? aboutMeWithContent
      : !submitSucceeded
      ? unSubmittedForm
      : aboutMeWithContent;
  }
}

export default connect()(AboutMe);
