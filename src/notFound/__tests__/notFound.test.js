import React from "react";
import "@testing-library/jest-dom/extend-expect";
import NotFound from "../index";
import { render } from "@testing-library/react";

it("renders not found message", () => {
  const { getByText } = render(<NotFound />);
  expect(getByText("Item Not Found")).toBeInTheDocument();
});
