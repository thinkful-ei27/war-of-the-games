import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import "./styles/profile.css";
import { getUser, getUserTopHistory } from "../actions/users";
import Loading from "./loading";
import ConnectedGame from "./Game";
import ConnectedRecommendations from "./Recommendations";

export class ProfilePage extends React.Component {
  componentDidMount() {
    const { userId, dispatch } = this.props;
    return Promise.all([
      dispatch(getUserTopHistory(userId)),
      dispatch(getUser(userId)).then(user => user)
    ]);
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
    const topSix = topHistory.map(history => {
      const { name, cloudImage, igdb, count, id } = history;
      return (
        <div>
          <p className="nes-text is-primary">{`You've selected ${name} ${count} times`}</p>
          <ConnectedGame
            slug={igdb.slug}
            name={name}
            cloudImage={cloudImage}
            key={id}
          />
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
          />
        </div>
      );
    });
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
                picanha alcatra tail meatloaf.{" "}
              </p>
            </div>
          </section>
        </div>
        <aside className="nes-container with-title recent-choices">
          <h4>Your Most Recent Choices!</h4>
          {recentHistory}
        </aside>
        <section className="nes-container top-6">
          <h4>Your Top 6 choices!</h4>
          {topSix}
        </section>
        <ul>{recentHistory}</ul>
        <ConnectedRecommendations />
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
    screenWidth: state.window.width
  };
};

export default requiresLogin()(connect(mapStateToProps)(ProfilePage));
