import React from "react";
import "./styles/gameInfo.css";

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
    "lich-king"
  ];
  const evaluateProfilePic = () => {
    // document.getElementById("dialog-default").close();
    switch (profilePic) {
      case "nes-ash":
        return <i className="nes-ash" />;
      case "nes-pokeball":
        return <i className="nes-pokeball" />;
      case "nes-bulbasaur":
        return <i className="nes-bulbasaur" />;
      case "nes-charmander":
        return <i className="nes-charmander" />;
      case "nes-squirtle":
        return <i className="nes-squirtle" />;
      case "nes-kirby":
        return <i className="nes-kirby" />;
      case "lich-king":
        return <i className="lich-king" />;
      default:
        return <i className="nes-mario" />;
    }
  };

  return <section>{evaluateProfilePic()}</section>;
}

Avatar.defaultProps = {
  profilePic: "nes-mario"
};
