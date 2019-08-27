import React from "react";
import { shallow } from "enzyme";
import { MenuItem } from "../header/MenuItem";

describe("<MenuItem />", () => {
  it("renders without crashing", () => {
    shallow(<MenuItem />);
  });
});
