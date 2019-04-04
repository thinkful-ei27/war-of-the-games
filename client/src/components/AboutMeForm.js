import React from "react";
import { connect } from "react-redux";
import { postUserAboutMe } from "../actions/users";

const AboutMeFrom = props => {
  const { dispatch } = props;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        return dispatch(postUserAboutMe(e.target.aboutMe.value));
      }}
    >
      <label htmlFor="textarea_field">Write about yourself</label>
      <textarea id="textarea_field" name="aboutMe" className="nes-textarea" />
      <button type="submit" className="nes-btn is-warning">
        Submit
      </button>
    </form>
  );
};

export default connect()(AboutMeFrom);
