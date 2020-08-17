import { atom, selector } from "recoil";
import { githubClient } from "../utils/api";
import { formatRepositoryResponse } from "../utils/data-processing";
import { getOrgNumber } from "../utils/data-processing";

export const organization = atom({
  key: "organization",
  default: "",
});

export const orgPage = atom({
  key: "org_page",
  default: {},
});

export const getRepositories = selector({
  key: "initial_repositories",
  get: async ({ get }) => {
    try {
      const response = await githubClient(
        `orgs/${get(organization)}/repos?sort=updated&direction=desc`
      );
      return formatRepositoryResponse(response);
    } catch (e) {
      return e;
    }
  },
});

export const getNextPageRepositories = selector({
  key: "next_page _repositories",
  get: async ({ get }) => {
    const orgPageInfo = get(orgPage);
    try {
      const getRepoData = await githubClient(
        `orgs/${orgPageInfo.org}/repos?sort=updated&direction=desc`
      );
      const orgNum = getOrgNumber(getRepoData.link);
      const response = await githubClient(
        `organizations/${orgNum}/repos?sort=updated&direction=desc&page=${orgPageInfo.page}`
      );
      return formatRepositoryResponse(response);
    } catch (e) {
      return e;
    }
  },
});
