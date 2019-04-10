/* eslint-disable no-nested-ternary */
import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import "./styles/profile.css";
import {
  getUser,
  getUserTopHistory,
  // getUserAboutMe,
  getUserSubmotivations
} from "../actions/users";
import Loading from "./loading";
import ConnectedGame from "./Game";
import ConnectedRecommendations from "./Recommendations";
import ConnectedWishList from "./WishList";
// profile pic imports

import Demon from "../assets/demon.png";
import Knight from "../assets/knight.png";
import BigZombie from "../assets/bigZombie.png";
import FemaleElf from "../assets/femaleElf.png";
import FemaleWizard from "../assets/femaleWizard.png";
import MaleElf from "../assets/maleElf.png";
import MaleWizard from "../assets/maleWizard.png";
import Ogre from "../assets/ogre.png";
import Shaman from "../assets/shaman.png";
import Radar from "./RadarChart";

export class ProfilePage extends React.Component {
  componentDidMount() {
    const { userId, dispatch } = this.props;
    return Promise.all([
      dispatch(getUserTopHistory(userId)),
      // dispatch(getUserAboutMe()),
      dispatch(getUserSubmotivations()),
      dispatch(getUser(userId)).then(user => user)
    ]);
  }

  evaluateProfilePic() {
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
        return Knight;
    }
  }

  render() {
    const {
      userHistory,
      loading,
      topHistory,
      screenWidth,
      subMotivations,
      firstName
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

    const recentHistory = userHistory.map(histInstance => {
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

    let iconSize = "is-small";

    if (!isMobile) {
      iconSize = "is-medium";
    }
    return loading ? (
      <Loading />
    ) : (
      <div className="game-container mx-auto">
        {/* <div className="nes-container with-title profile-info-container">
          <p className="title user shadow">Hello {name}!</p>
          <section className="personal-info">
            <p>
              <img
                className="profile-pic"
                src={this.evaluateProfilePic(profilePic)}
                alt="profile-pic"
              />
            </p>
            <AboutMe aboutMe={aboutMe} /> 
          </section>
        </div> */}
        <div className="game-container mx-auto text-xs img-responsive">
          <Radar name={firstName} />
        </div>
        <ConnectedRecommendations
          profileWidth="w-1"
          isMobile={isMobile}
          subMotivations={subMotivations}
        />
        <ConnectedWishList profileWidth="w-1" isMobile={isMobile} />
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;

  return {
    aboutMe: state.user.aboutMe,
    topHistory: state.user.topHistory,
    userId: currentUser.id,
    username: state.auth.currentUser.username,
    fullName: `${currentUser.firstName} ${currentUser.lastName}`,
    firstName: currentUser.firstName,
    userHistory: state.user.history,
    subMotivations: state.user.subMotivations,
    loading: state.user.loading,
    screenWidth: state.window.width,
    profilePic: state.auth.currentUser.profilePic
  };
};

export default requiresLogin()(connect(mapStateToProps)(ProfilePage));
