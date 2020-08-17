import React from "react";
import {
  getRepositories,
  organization,
  getNextPageRepositories,
  orgPage,
} from "../state";
import {
  useRecoilValueLoadable,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { useParams } from "react-router-dom";
import Progress from "../progress";
import RepoBase from "./repoBase";
import { getOrgNumber } from "../utils/data-processing";

//This page needs to handle multiple situations
//the scenario where the user lands on the regular Repo page and
//clicks to this page; The scenario where someone changes the url to another
//organization; The scenario where someone changes the page number in the url
//In the last 2 scenarios, this page has no context to repositories and the org
//number, which is retrieved from getting the repo.  This needs to fetch the
//repositories first, then it can get the org numbers and correlate that with
//page numbers
export default function PaginatedRepositories() {
  const params = useParams();
  const repository = useRecoilValueLoadable(getRepositories);
  const setOrgPage = useSetRecoilState(orgPage);
  const paginatedRepo = useRecoilValueLoadable(getNextPageRepositories);
  const [org, setOrganization] = useRecoilState(organization);

  if (repository.state === "loading") {
    return <Progress />;
  } else if (
    //getting repositories doesnt work because no context of organization
    (repository.state === "hasError" ||
      repository.contents.message === "Not Found") &&
    org === ""
  ) {
    setOrganization(params.org);
    return <Progress />;
  } else if (
    //got the organization but the pages based on org numbers arent accessable yet
    repository.state === "hasValue" &&
    paginatedRepo?.contents?.message === "Not Found"
  ) {
    setOrgPage({
      organization: getOrgNumber(repository?.contents?.link || ""),
      page: params?.page,
    });
    return <Progress />;
  } else if (paginatedRepo.state === "hasValue") {
    //able to get paginated data
    return (
      <RepoBase
        content={paginatedRepo?.contents.content}
        org={org}
        link={paginatedRepo?.contents.link}
      />
    );
  }
  return <Progress />;
}
