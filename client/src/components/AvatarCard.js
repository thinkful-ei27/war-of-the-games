import React from "react";
import "./styles/gameInfo.css";
import { connect } from "react-redux";
import Avatar from "./Avatar";
import requiresLogin from "./requires-login";

class AvatarCard extends React.Component {
  state = {
    profilePic: "nes-mario"
  };

  showModal = () => {
    document.getElementById("dialog-default").showModal();
  };

  hideModal = () => {
    document.getElementById("dialog-default").close();
  };

  updateProfilePic(e) {
    const pic = e.currentTarget.id;
    this.setState({
      profilePic: pic
    });
    this.hideModal();
  }

  render() {
    const { level, xpToNextLevel } = this.props;
    const classIconNames = [
      "nes-mario",
      "nes-ash",
      "nes-pokeball",
      "nes-bulbasaur",
      "nes-charmander",
      "nes-squirtle",
      "nes-kirby"
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
        <section>
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
        <div>
          <div className="profile-xp-card">
            <p>
              <button
                type="button"
                className="nes-btn"
                onClick={() => this.showModal()}
              >
                +
                <Avatar profilePic={this.state.profilePic} />
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
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;

  return {
    level: currentUser.level,
    xpToNextLevel: currentUser.xpToNextLevel
  };
};

export default requiresLogin()(connect(mapStateToProps)(AvatarCard));
