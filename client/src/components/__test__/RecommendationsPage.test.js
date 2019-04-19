import React from "react";
import { shallow } from "enzyme";
import { RecommendationsPage } from "../recommendations/RecommendationsPage";

describe("<RecommendationsPage/>", () => {
  it("renders without crashing", () => {
    shallow(<RecommendationsPage />);
  });
});
