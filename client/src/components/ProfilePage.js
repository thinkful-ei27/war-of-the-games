import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import "./styles/profile.css";
import { getUser, getUserTopHistory } from "../actions/users";
import LongText from "./LongText";
import Loading from "./loading";
import ConnectedGame from "./Game";
import ConnectedRecommendations from "./Recommendations";
// profile pic imports

import Demon from '../assets/demon.png';
import Knight from '../assets/knight.png';
import BigZombie from '../assets/bigZombie.png';
import FemaleElf from '../assets/femaleElf.png';
import FemaleWizard from '../assets/femaleWizard.png';
import MaleElf from '../assets/maleElf.png';
import MaleWizard from '../assets/maleWizard.png';
import Ogre from '../assets/ogre.png';
import Shaman from '../assets/shaman.png';

export class ProfilePage extends React.Component {
  componentDidMount() {
    const { userId, dispatch } = this.props;
    return Promise.all([
      dispatch(getUserTopHistory(userId)),
      dispatch(getUser(userId)).then(user => user)
    ]);
  }

  evaluateProfilePic(userInfo) {
    const { profilePic } = this.props;
    switch (profilePic) {
      case "Demon":
        return Demon;
      case "Knight":
        return Knight;
      case "BigZombie":
        return BigZombie;
      case "FemaleElf":
        return FemaleElf;
      case "FemaleWizard":
        return FemaleWizard;
      case "MaleElf":
        return MaleElf;
      case "MaleWizard":
        return MaleWizard;
      case "Ogre":
        return Ogre;
      case "Shaman":
        return Shaman;
      default:
        return Knight
    }
  }
  render() {
    const {
      username,
      history,
      name,
      loading,
      topHistory,
      screenWidth
    } = this.props;
    const isMobile = screenWidth <= 768;
    const topSix = topHistory.map(history => {
      const { name, cloudImage, igdb, count, id } = history;
      return (
        <div key={id} className="mt-4 text-center">
          <ConnectedGame
            slug={igdb.slug}
            name={name}
            cloudImage={cloudImage}
            key={id}
            screenWidth={screenWidth}
            profileWidth="w-1"
            profileFontSize="text-xs"
          />
          <p className="nes-text is-primary mx-auto choice-count">
            {isMobile
              ? `selected ${count} times`
              : `You've selected ${name} ${count} times`}
          </p>
        </div>
      );
    });
    const recentHistory = history.map(histInstance => {
      const { choice, id } = histInstance;
      return (
        <div key={id} className="flex justify-start content-start flex-wrap">
          <ConnectedGame
            screenWidth={screenWidth}
            slug={choice.igdb.slug}
            name={choice.name}
            cloudImage={choice.cloudImage}
            profileFontSize="text-xs"
            profileWidth="w-1"
          />
        </div>
      );
    });

    let nesContainer = "";
    let iconSize = "is-small";

    if (!isMobile) {
      nesContainer = "nes-container";
      iconSize = "is-medium";
    }

    const aboutMeContent = `Bacon ipsum dolor amet strip steak filet mignon capicola,
    picanha boudin pig frankfurter shank kielbasa tri-tip pancetta.
    Frankfurter shoulder swine picanha pig. Tongue ribeye pig strip
    steak brisket, ham shankle pork chop doner jowl turducken cow
    tenderloin frankfurter t-bone. Ribeye pastrami filet mignon
    burgdoggen. Tri-tip corned beef beef kevin drumstick. Cow
    picanha alcatra tail meatloaf.`;

    return (
      <div className="dashboard">
        <div className="nes-container with-title profile-info-container">
          <p className="title user shadow">Hello {name}!</p>
          <section className="personal-info">
            <div className={`${nesContainer} with-title about-me-container`}>
              <p className="title">
                <img
                  className="title profile-pic"
                  src={this.evaluateProfilePic(this.props.profilePic)}
                  alt="profile-pic"
                />
              </p>
              {isMobile ? (
                <LongText
                  className="about-me"
                  limit={175}
                  content={aboutMeContent}
                />
              ) : (
                  <p className="about-me">{aboutMeContent}</p>
                )}
            </div>
          </section>
        </div>
        <ConnectedRecommendations profileWidth="w-1" isMobile={isMobile} />
        <section className="nes-container top-six m-4">
          <h4>
            <i className={`nes-icon ${iconSize} heart`} />
            Your Top 6 choices!
          </h4>
          {topSix}
        </section>
        <aside className="nes-container with-title recent-choices">
          <h4>Your Most Recent Choices!</h4>
          {recentHistory}
        </aside>
        <ul>{recentHistory}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;

  return {
    topHistory: state.user.topHistory,
    userId: currentUser.id,
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    history: state.user.history,
    loading: state.user.loading,
    screenWidth: state.window.width,
    profilePic: state.auth.currentUser.profilePic
  };
};

export default requiresLogin()(connect(mapStateToProps)(ProfilePage));
