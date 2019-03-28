import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';

export class ProfilePage extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    const { username, history, name } = this.props;
    console.log(this.props);
    return (
      <div className="dashboard">
        <div className="dashboard-username">Username: {username}</div>
        <div className="dashboard-name">Name: {name}</div>
        <div className="dashboard-protected-data" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  console.log(currentUser);
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    history: state.auth.currentUser.history
  };
};

export default requiresLogin()(connect(mapStateToProps)(ProfilePage));
