import React from "react";
import { shallow } from "enzyme";
import { App } from "./app";

describe("<App />", () => {
  it("renders without crashing", () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    shallow(<App dispatch={dispatch} />);
  });
});
