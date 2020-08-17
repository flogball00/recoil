import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Search from "../index";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

it("renders search input", () => {
  render(
    <RecoilRoot>
      <Search />
    </RecoilRoot>
  );
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});
