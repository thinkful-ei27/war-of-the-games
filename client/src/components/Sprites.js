import React from 'react'
import { connect } from "react-redux";
import { Field, reduxForm, focus } from "redux-form";
import './styles/sprites.css'
const { input } = React
export default class Sprites extends React.Component {

  render() {

    return (
      <div className="form-input">
        <div className="profile-selector">

          <label className="avatar demon" htmlFor="demon"></label>
          <input id="demon" type="radio" name="profile-pic" value="demon" />

          <input id="knight" type="radio" name="profile-pic" value="knight" />
          <label className="avatar knight" htmlFor="knight"></label>

          <input id="bigZombie" type="radio" name="profile-pic" value="bigZombie" />
          <label className="avatar bigZombie" htmlFor="bigZombie"></label>

          <input id="femaleElf" type="radio" name="profile-pic" value="femaleElf" />
          <label className="avatar femaleElf" htmlFor="femaleElf"></label>

          <input id="femaleWizard" type="radio" name="profile-pic" value="femaleWizard" />
          <label className="avatar femaleWizard" htmlFor="femaleWizard"></label>

          <input id="maleElf" type="radio" name="profile-pic" value="maleElf" />
          <label className="avatar maleElf" htmlFor="maleElf"></label>

          <input id="maleWizard" type="radio" name="profile-pic" value="maleWizard" />
          <label className="avatar maleWizard" htmlFor="maleWizard"></label>

          <input id="ogre" type="radio" name="profile-pic" value="ogre" />
          <label className="avatar ogre" htmlFor="ogre"></label>

          <input id="shaman" type="radio" name="profile-pic" value="shaman" />
          <label className="avatar shaman" htmlFor="shaman"></label>

        </div>
      </div >
    )
  }
}
