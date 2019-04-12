import React from "react";
import { shallow } from "enzyme";
import { RecommendationsPage } from "../RecommendationsPage";

describe("<RecommendationsPage/>", function() {
  it("renders without crashing", () => {
    shallow(<RecommendationsPage />);
  });
});
