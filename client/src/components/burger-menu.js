import React, { Component } from "react";
import Menu from './Menu';
import burger from '../assets/burger-menu.svg';
import pixelBurger from '../assets/pixel-burger.png'

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
    const { menuItems } = this.props 
    let content;
    if (!expanded) {
      content = <img alt="burger-menu" src={pixelBurger} aria="expanded false"/>;
    }
    if (expanded) {
      content = <Menu menuItems={menuItems}/>
    }


    return (
      <div onClick={() => this.handleClick()}>
        {content}
      </div>
    );
  }
}
