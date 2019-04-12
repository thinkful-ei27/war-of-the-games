import React from "react";
import "../styles/gameInfo.css";

export default function Avatar(props) {
  const { profilePic } = props;
  const classIconNames = [
    "nes-mario",
    "nes-ash",
    "nes-pokeball",
    "nes-bulbasaur",
    "nes-charmander",
    "nes-squirtle",
    "nes-kirby",
    "lich-king",
    "gen-sonic",
    "excitebike",
    "cloud-strife",
    "master-chief"
  ];
  const evaluateProfilePic = () => {
    return classIconNames.includes(profilePic) ? (
      <i className={profilePic} />
    ) : (
      <i className="nes-mario" />
    );
  };

  return <section>{evaluateProfilePic()}</section>;
}

Avatar.defaultProps = {
  profilePic: "nes-mario"
};
