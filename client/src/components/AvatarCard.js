import React from "react";
import "./styles/gameInfo.css";
import { connect } from "react-redux";
import Avatar from "./Avatar";
import requiresLogin from "./requires-login";
import { updateUserProfilePic } from "../actions/users";

class AvatarCard extends React.Component {
  showModal = () => {
    const modal = document.getElementById("dialog-default");
    window.dialogPolyfill.registerDialog(modal);
    modal.showModal();
  };

  hideModal = () => {
    const dialog = document.getElementById("dialog-default");
    dialog.close();
  };

  updateProfilePic(e) {
    const pic = e.currentTarget.id;
    const { userId, dispatch } = this.props;
    dispatch(updateUserProfilePic(userId, pic));
    this.hideModal();
  }

  render() {
    const { level, xpToNextLevel, initialPic } = this.props;
    const classIconNames = [
      "nes-mario",
      "nes-ash",
      "nes-pokeball",
      "nes-bulbasaur",
      "nes-charmander",
      "nes-squirtle",
      "nes-kirby",
      "lich-king",
      "gen-sonic",
      "excitebike",
      "cloud-strife",
      "master-chief"
    ];
    const classMap = classIconNames.map(icon => (
      <li
        className="w-1/3 p-2 avatar-sprite"
        onClick={e => this.updateProfilePic(e)}
        id={icon}
      >
        <i className={`${icon}`} value={icon} />
      </li>
    ));
    return (
      <section>
        <section className="full-dialog">
          <dialog className="nes-dialog" id="dialog-default">
            <form method="dialog">
              <p className="title">Profile Pic</p>
              {/* <p>Alert: this is a dialog.</p> */}
              <ul className="list-reset flex flex-row flex-wrap justify-around avatar-list">
                {classMap}
              </ul>
              <menu className="dialog-menu">
                <button
                  type="button"
                  className="nes-btn"
                  onClick={() => this.hideModal()}
                >
                  Cancel
                </button>
              </menu>
            </form>
          </dialog>
        </section>
        <div className="profile-xp-card">
          <p>
            <button
              type="button"
              className="nes-btn"
              onClick={() => this.showModal()}
            >
              +
              <Avatar profilePic={this.props.profilePic || initialPic} />
            </button>
          </p>
          <div className="">
            <p className="text-2xl">
              <span className="nes-text is-success text-2xl mx-4">LV</span>
              {level}
            </p>
            <p className="text-2xl">
              <span className="nes-text is-success text-2xl mx-4">XP</span>
              {xpToNextLevel}
            </p>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;

  return {
    userId: currentUser.id,
    level: currentUser.level,
    xpToNextLevel: currentUser.xpToNextLevel,
    profilePic: state.user.profilePic
  };
};

export default requiresLogin()(connect(mapStateToProps)(AvatarCard));
