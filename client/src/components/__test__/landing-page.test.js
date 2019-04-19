import React from "react";
import { shallow } from "enzyme";
import { LandingPage } from "../onBoard/landing-page";

describe("<LandingPage />", () => {
  it("renders without crashing", () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    shallow(<LandingPage games={[]} dispatch={dispatch} />);
  });
});
