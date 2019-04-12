import React from "react";
import { shallow } from "enzyme";
import { Battle } from "../battle";

describe("<Battle />", () => {
  it("renders without crashing", () => {
    shallow(<Battle games={[{}, {}]} />);
  });
});
