import React from "react";
import "./styles/radarToolTip.css";

function getMotivationInfo(label) {
  if (label === "achievement") {
    return "Gamers with high Achievement scores are driven to accrue power, rare items, and collectibles, even if this means grinding for a while. Gamers with low Achievement scores have a relaxed attitude towards in-game achievements and don’t worry too much about their scores or progress in the game.";
  }
  if (label === "mastery") {
    return "Gamers with high Mastery scores like challenging gaming experiences with strategic depth and complexity. Gamers with low Mastery scores enjoy being spontaneous in games and prefer games that are accessible and forgiving when mistakes are made.";
  }
  if (label === "creativity") {
    return "Gamers with high Creativity scores are constantly experimenting with their game worlds and tailoring them with their own designs and customizations. Gamers with low Creativity scores are more practical in their gaming style and accept their game worlds as they are.";
  }
  if (label === "action") {
    return "Gamers with high Action scores are aggressive and like to jump in the fray and be surrounded by dramatic visuals and effects. Gamers with low Action scores prefer slower-paced games with calmer settings.";
  }
  if (label === "social") {
    return "Gamers with high Social scores enjoy interacting with other players, often regardless of whether they are collaborating or competing with them. Gamers with low Social scores prefer solo gaming experiences where they can be independent.";
  }
  if (label === "immersion") {
    return "Gamers with high Immersion scores want games with interesting narratives, characters, and settings so they can be deeply immersed in the alternate worlds created by games. Gamers with low Immersion scores are more grounded in the gameplay mechanics and care less about the narrative experiences that games offer.";
  }
}

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="radar-tooltip">
        <p className="label">{`${label} : ${payload[0].value}%`}</p>
        <p className="intro">{getMotivationInfo(label)}</p>
      </div>
    );
  }

  return null;
}

export default CustomTooltip;
