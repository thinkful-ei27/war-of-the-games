import React from "react";
import "./styles/gameInfo.css";
import Avatar from "./Avatar";

export default class AvatarCard extends React.Component {
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
    console.log(e.currentTarget.id);
    const pic = e.currentTarget.id;
    this.setState({
      profilePic: pic
    });
    this.hideModal();
  }

  render() {
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
          <button
            type="button"
            className="nes-btn is-primary"
            onClick={() => this.showModal()}
          >
            +
            <Avatar profilePic={this.state.profilePic} />
          </button>
        </div>
      </section>
    );
  }
}
