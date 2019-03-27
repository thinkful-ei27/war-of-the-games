import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

export function MenuItem(props) {
  const { name, link } = props;
  const logout = () => {
    props.dispatch(clearAuth());
    clearAuthToken();
  };
  return (
    <li className="nav-button">
      <Link
        to={link}
        className="nav-button"
        onClick={name === 'Sign Out' ? () => logout() : ''}
      >
        {name}
      </Link>
    </li>
  );
}

export default connect()(MenuItem);
