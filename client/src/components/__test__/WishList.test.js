import React from "react";
import { shallow } from "enzyme";
import WishList from "../recommendations/WishList";

describe("<WishList />", () => {
  it("renders without crashing", () => {
    shallow(<WishList wishList={[]} />);
  });
});
