import React from "react";
import { shallow } from "enzyme";
import { UserOnboard } from "../onBoard/userOnboard";

describe("<UserOnboard />", () => {
  it("renders without crashing", () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    const tests = {
      showing: [
        { name: "test", coverUrl: "test", id: "test" },
        { name: "test", coverUrl: "test", id: "test" }
      ]
    };
    shallow(<UserOnboard dispatch={dispatch} tests={tests} />);
  });
});
