import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Progress from "../index";
import { render, screen } from "@testing-library/react";

it("renders header message", () => {
  render(<Progress />);
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});
