import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import './styles/profile.css';

export class ProfilePage extends React.Component {
  componentDidMount() {
    console.log('mounted');
  }

  render() {
    const { username, history, name } = this.props;
    console.log(this.props);
    return (
      <div className="dashboard">
        <div className="nes-container with-title profile-info-container">
          <p className="title user">Hello {name}!</p>
          <section className="personal-info">
            <div className="nes-container with-title is-rounded about-me-container">
              <p className="title">
                <img
                  className="title profile-pic"
                  src="https://i.pinimg.com/originals/2f/56/20/2f5620472cc9033a970e3b0bd4fa66d7.png"
                  alt="profile-pic"
                />
              </p>
              <p className="about-me">
                Bacon ipsum dolor amet strip steak filet mignon capicola,
                picanha boudin pig frankfurter shank kielbasa tri-tip pancetta.
                Frankfurter shoulder swine picanha pig. Tongue ribeye pig strip
                steak brisket, ham shankle pork chop doner jowl turducken cow
                tenderloin frankfurter t-bone. Ribeye pastrami filet mignon
                burgdoggen. Tri-tip corned beef beef kevin drumstick. Cow
                picanha alcatra tail meatloaf.{' '}
              </p>
            </div>
          </section>
        </div>
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
