import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

export class HeaderBar extends React.Component {
  logOut() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.dispatch(clearAuth());
    clearAuthToken();
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
      <Menu className="header-bar">
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/leaderBoard">Leader Board</Link>
        {logOutButton}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
