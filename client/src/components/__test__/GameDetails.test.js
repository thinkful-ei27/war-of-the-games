import React from "react";
import { shallow } from "enzyme";
import { GameDetails } from "../gamePage/GameDetails";

describe("<GameDetails />", () => {
  it("renders without crashing", () => {
    const game = {
      genres: []
    };
    shallow(<GameDetails game={game} />);
  });
});
