import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import Menu from './Menu';
import './styles/header.css';

export class HeaderBar extends React.Component {
  state = {
    menuItems: [
      { name: 'Vote', link: '/', key: '0' },
      { name: 'About', link: '/about', key: '1' },
      { name: 'Sign Up', link: '/register', key: '2' },
      { name: 'Login', link: '/login', key: '3' },
      { name: 'Profile', link: '/profile', key: '4' },
      { name: 'Sign Out', link: '/login', key: '5' }
    ]
  };

  handleLinks() {
    const { menuItems } = this.state;
    if (this.props.loggedIn) {
      const hidden = ['Sign Up', 'Login'];
      return menuItems.filter(item => !hidden.includes(item.name));
    }
    const hidden = ['Sign Out', 'Profile'];
    return menuItems.filter(item => !hidden.includes(item.name));
  }

  render() {
    // Only render the log out button if we are logged in

    return (
      <header className="header-bar">
        <div className="nes-container with-title is-centered">
          <h1 className="title">Foo App</h1>

          <section className="nes-container nav-container">
            <Menu menuItems={this.handleLinks()} />
          </section>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
