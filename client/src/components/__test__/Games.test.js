import React from "react";
import { shallow } from "enzyme";
import { InfiniteGames } from "../gamePage/Games";

describe("<InfiniteGames />", () => {
  it("renders without crashing", () => {
    shallow(<InfiniteGames games={[]} />);
  });
});
