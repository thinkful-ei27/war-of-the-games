import React from "react";
import { connect } from "react-redux";
import "./styles/sprites.css";
export class Sprites extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
  };

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  render() {
    return (
      <form name="sprite-form">
        <p>Select an avatar</p>
        <div className="profile-selector">
          <input id="demon" type="radio" name="profile-pic" value="demon" />
          <label className="avatar demon" htmlFor="demon" />

          <input id="knight" type="radio" name="profile-pic" value="knight" />
          <label className="avatar knight" htmlFor="knight" />

          <input
            id="bigZombie"
            type="radio"
            name="profile-pic"
            value="bigZombie"
          />
          <label className="avatar bigZombie" htmlFor="bigZombie" />

          <input
            id="femaleElf"
            type="radio"
            name="profile-pic"
            value="femaleElf"
          />
          <label className="avatar femaleElf" htmlFor="femaleElf" />

          <input
            id="femaleWizard"
            type="radio"
            name="profile-pic"
            value="femaleWizard"
          />
          <label className="avatar femaleWizard" for="femaleWizard" />

          <input id="maleElf" type="radio" name="profile-pic" value="maleElf" />
          <label className="avatar maleElf" htmlFor="maleElf" />

          <input
            id="maleWizard"
            type="radio"
            name="profile-pic"
            value="maleWizard"
          />
          <label className="avatar maleWizard" htmlFor="maleWizard" />

          <input id="ogre" type="radio" name="profile-pic" value="ogre" />
          <label className="avatar ogre" htmlFor="ogre" />

          <input id="shaman" type="radio" name="profile-pic" value="shaman" />
          <label className="avatar shaman" htmlFor="shaman" />
        </div>
        <button
          type="submit"
          className="nes-btn is-primary"
          htmlFor="sprite-form"
          onClick={e => this.handleSubmit(e)}
        >
          Select Avatar
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Sprites);
