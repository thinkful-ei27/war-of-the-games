import React from "react";
import { shallow } from "enzyme";
import { AboutPage } from "../about";

describe("<AboutPage />", () => {
  it("renders without crashing", () => {
    shallow(<AboutPage />);
  });
});
