import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { decorator as reduxBurgerMenu } from 'react-burger-menu';
import MenuButton from './MenuButton';
import { slide as Menu } from 'react-burger-menu';
import './header.css';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

export class HeaderBar extends Component {
  state = {
    dropdownCollapsed: false
  };

  logOut() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }
  toggleNav() {
    this.setState({
      dropdownCollapsed: !this.state.dropdownCollapsed
    });
  }

  render() {
    const { loggedIn } = this.props;
    // Only render the log out button if we are logged in
    let logOutButton;
    if (loggedIn) {
      logOutButton = (
        <button type="button" onClick={() => this.logOut()}>
          Log out
        </button>
      );
    }

    return (
      <header className="header">
        <Menu
          className="bm-burger-button"
          right
          customBurgerIcon={<MenuButton />}
          onStateChange={() => this.toggleNav}
          isOpen={false}
          width={'10%'}
          height={'10%'}
        >
          <Link to="/" onClick={() => this.toggleNav()}>
            Home
          </Link>
          <Link to="/about" onClick={() => this.toggleNav()}>
            About
          </Link>
          <Link to="/profile" onClick={() => this.toggleNav()}>
            Profile
          </Link>
          <Link to="/leaderBoard" onClick={() => this.toggleNav()}>
            Leader Board
          </Link>
          {logOutButton}
        </Menu>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
