import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Timeline from "../timeline";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { formatCommitResponse } from "../../utils/data-processing";
import { data } from "../../testMocks/mock-commit-data.ignore";
it("renders timeline", () => {
  const { getByText } = render(
    <RecoilRoot>
      <Timeline data={formatCommitResponse(data)} />
    </RecoilRoot>
  );
  expect(getByText("Matheus")).toBeInTheDocument();
  expect(
    getByText("8eee5949c138c868895fa4db7982375f28b17cdf")
  ).toBeInTheDocument();
  expect(getByText("description: mock description")).toBeInTheDocument();
  expect(getByText("Martin")).toBeInTheDocument();
  expect(
    getByText("86abdc81eef37d5e77791abf0cb3b1b1297e369e")
  ).toBeInTheDocument();
  expect(
    getByText("description: task: upgrade dependencies")
  ).toBeInTheDocument();
});
