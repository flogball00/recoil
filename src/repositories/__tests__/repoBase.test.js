import React from "react";
import "@testing-library/jest-dom/extend-expect";
import RepoBase from "../repoBase";
import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { repoData } from "../../testMocks/mock-repo-content.ignore";
it("renders the repo card with the correct data", () => {
  const history = createMemoryHistory();
  const { getByText, getAllByRole } = render(
    <RecoilRoot>
      <Router history={history}>
        <RepoBase org={"test"} content={repoData} />
      </Router>
    </RecoilRoot>
  );
  expect(getByText("RepoSearch")).toBeInTheDocument();
  expect(getByText("Repository Results for test")).toBeInTheDocument();
  expect(getByText("desc 1")).toBeInTheDocument();
  expect(getByText("desc 2")).toBeInTheDocument();
  expect(getByText("Org: Netflix")).toBeInTheDocument();
  expect(getByText("Org: mike")).toBeInTheDocument();
  expect(getByText("test1")).toBeInTheDocument();
  expect(getByText("test2")).toBeInTheDocument();
  expect(getByText("Language: Python")).toBeInTheDocument();
  expect(getByText("Language: Java")).toBeInTheDocument();
  const images = getAllByRole("img");
  expect(images.length).toBe(2);
  expect(images[0]).toHaveAttribute("src", "testavatar");
  expect(images[1]).toHaveAttribute("src", "mikeavatar");
});
