import React from "react";
import { shallow } from "enzyme";
import { Card } from "../votePage/card";

describe("<Card />", () => {
  it("renders without crashing", () => {
    const game = { name: "" };
    shallow(<Card game={game} />);
  });
});
