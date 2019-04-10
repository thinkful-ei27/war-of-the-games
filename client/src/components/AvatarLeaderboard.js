import React from "react";
import Avatar from "./Avatar";

export default function AvatarLeaderboard(props) {
  const { username, level, xpToNextLevel, profilePic } = props;
  return (
    <div
      className="flex flex-row p-4 m-16 nes-container is-dark"
      id="profile-details"
    >
      <Avatar profilePic={profilePic} />
      <div className="">
        <p className="text-2xl">
          <span className="nes-text is-success text-2xl mx-4">LV</span>
          {level}
        </p>
        <p className="text-2xl">
          <span className="nes-text is-success text-2xl mx-4">XP</span>
          {xpToNextLevel}
        </p>
      </div>
    </div>
  );
}

AvatarLeaderboard.defaultProps = {
  username: "none",
  level: "000",
  xpToNextLevel: "000 / 000",
  profilePic: "nes-mario"
};
