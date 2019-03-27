import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import './styles/header.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = <button onClick={() => this.logOut()}>Log out</button>;
    }
    const about = <Link to="/about">About</Link>;
    return (
      <header className="header-bar">
        <div className="nes-container with-title is-centered">
          <h1 className="title">Foo App</h1>
          <p>Some description here?</p>
          <div className="nes-container nav-container">
            <Link className="nav-button" to="/">
              About
            </Link>
            <Link className="nav-button" to="/register">
              Sign Up
            </Link>
            <Link className="nav-button" to="/vote">
              Vote
            </Link>
          </div>
        </div>

        {logOutButton}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
