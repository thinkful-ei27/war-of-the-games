import React from "react";
import { shallow } from "enzyme";
import { WishListPage } from "../recommendations/WishListPage";

describe("<WishListPage />", () => {
  it("renders without crashing", () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    shallow(
      <WishListPage dispatch={dispatch} match={{ params: {} }} wishList={[]} />
    );
  });
});
