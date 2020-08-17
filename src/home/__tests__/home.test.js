import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../index";
import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

it("renders header message", () => {
  const { getByText } = render(
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );
  expect(getByText("RepoSearch")).toBeInTheDocument();
});
