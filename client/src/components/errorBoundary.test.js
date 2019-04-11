import React from "react";
import { shallow } from "enzyme";
import ErrorBoundary from "./errorBoundary";

describe("<ErrorBoundary />", () => {
  it("renders without crashing", () => {
    shallow(<ErrorBoundary />);
  });
});
