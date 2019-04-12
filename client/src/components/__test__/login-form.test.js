import React from "react";
import { shallow } from "enzyme";
import { LoginForm } from "./login-form";

describe("<LoginForm />", () => {
  it("renders without crashing", () => {
    shallow(<LoginForm />);
  });
});
