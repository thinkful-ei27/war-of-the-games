import React, { Component } from "react";
import Menu from "./Menu";
import pixelBurger from "../../assets/pixel-burger.png";
import "../styles/burger-menu.css";

export default class BurgerMenu extends Component {
  state = {
    expanded: false
  };

  handleClick() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const { expanded } = this.state;
    const { menuItems } = this.props;
    let content;
    if (!expanded) {
      content = (
        <img className="burger-img" alt="burger-menu" src={pixelBurger} />
      );
    }
    if (expanded) {
      content = <Menu menuItems={menuItems} />;
    }

    return (
      <button
        className="burger-menu__button"
        type="button"
        onClick={() => this.handleClick()}
      >
        {content}
      </button>
    );
  }
}
