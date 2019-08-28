import React, { Component } from "react";
import dialogPolyfill from "dialog-polyfill";
import Menu from "./Menu";
import pixelBurger from "../../assets/pixel-burger.png";
import "../styles/burger-menu.css";

export default class BurgerMenu extends Component {
  static handleClick() {
    const dialog = document.querySelector(".burger-menu__dialog");
    dialog.showModal();
  }

  static hideDialog() {
    const dialog = document.querySelector(".burger-menu__dialog");
    dialog.close();
  }

  componentDidMount() {
    const dialog = document.querySelector(".burger-menu__dialog");
    dialogPolyfill.registerDialog(dialog);
  }

  render() {
    const { menuItems } = this.props;

    return (
      <div className="burger-menu">
        <button
          className="burger-menu__button"
          type="button"
          onClick={() => BurgerMenu.handleClick()}
        >
          <img className="burger-img" alt="burger-menu" src={pixelBurger} />
        </button>
        <dialog className="burger-menu__dialog">
          <Menu className="burger-menu__menu" menuItems={menuItems} />
          <button
            className="nes-btn"
            onClick={() => BurgerMenu.hideDialog()}
            type="button"
          >
            Close
          </button>
        </dialog>
      </div>
    );
  }
}
