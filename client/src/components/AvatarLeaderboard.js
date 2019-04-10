import React from "react";
import Avatar from "./Avatar";
import LongText from "./LongText";

export default function AvatarLeaderboard(props) {
  const { username, level, xpToNextLevel, profilePic } = props;
  let toShow;
  if (username.length < 15) {
    toShow = username;
  } else {
    toShow = `${username.substring(0, 10)}...`;
  }
  return (
    <div
      className="avatar-leaderboard m-16 nes-container is-dark"
      id="profile-details"
    >
      <div className="avatar-leaderboard-pic">
        <Avatar profilePic={profilePic} />
      </div>
      <p className="text-2xl avatar-leaderboard-name">{toShow}</p>
      <p className="text-2xl">
        <span className="nes-text is-success text-2xl mx-4">LV</span>
        {level}
      </p>
      <p className="text-2xl">
        <span className="nes-text is-success text-2xl mx-4">XP</span>
        {xpToNextLevel}
      </p>
      <div className="" />
    </div>
  );
}

AvatarLeaderboard.defaultProps = {
  username: "none",
  level: "000",
  xpToNextLevel: "000 / 000",
  profilePic: "nes-mario"
};
