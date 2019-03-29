import React from "react";
import { shallow } from "enzyme";
import { App } from "./app";

describe("<App />", function() {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});
