import { atom, selector, selectorFamily } from "recoil";
import { githubClient } from "../utils/api";
import { formatResponse } from "../utils/data-processing";

export const organization = atom({
  key: "organization",
  default: "",
});

export const getInitialRepositories = selector({
  key: "initial_repositories",
  get: async ({ get }) => {
    const response = await githubClient(`orgs/${get(organization)}/repos`);
    return formatResponse(response);
  },
});

export const getNextPageRepositories = selectorFamily({
  key: "next_page _repositories",
  get: (organizationPage) => async () => {
    const response = await githubClient(
      `organizations/${organizationPage.organization}/repos?page=${organizationPage.page}`
    );
    return formatResponse(response);
  },
});

export const getRepositories = selector({
  key: "repositories",
  get: async ({ get }) => {
    return get(getInitialRepositories);
  },
});
