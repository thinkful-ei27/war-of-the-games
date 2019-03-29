import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import './styles/header.css';
import "./styles/gameInfo.css";

export class HeaderBar extends React.Component {
  state = {
    menuItems: [
      { name: 'Vote', link: '/', key: 'vote' },
      { name: 'Games', link: '/games', key: 'games' },
      { name: 'About', link: '/about', key: 'about' },
      { name: 'Sign Up', link: '/register', key: 'signup' },
      { name: 'Login', link: '/login', key: 'login' },
      { name: 'Sign Out', link: '/login', key: 'signout' }
    ]
  };

  handleLinks() {
    const { menuItems } = this.state;
    if (this.props.loggedIn) {
      const hidden = ['Sign Up', 'Login'];
      return menuItems.filter(item => !hidden.includes(item.name));
    }
    const hidden = ['Sign Out'];
    return menuItems.filter(item => !hidden.includes(item.name));
  }

  render() {
    // Only render the log out button if we are logged in

    return (
      <header className="container mx-auto shadow">
        <div className="flex flex-row justify-between">
          <Link to='/'>          
          <h2 className="p-4">
          <i class="nes-logo"></i>
          War of the Games</h2>
          </Link>
          <section className="p-4">
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
