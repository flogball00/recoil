import React from "react";
import { getRepositories, organization, orgPage } from "../state";
import {
  useRecoilValueLoadable,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { useParams } from "react-router-dom";
import Progress from "../progress";
import RepoBase from "./repoBase";
import { getOrgNumber } from "../utils/data-processing";

export default function Repositories() {
  const repository = useRecoilValueLoadable(getRepositories);
  const params = useParams();
  const setOrgPage = useSetRecoilState(orgPage);
  const [org, setOrganization] = useRecoilState(organization);
  if (
    //if someone just went to /repositories/:org need, set the org
    (repository.state === "hasError" ||
      repository.contents.message === "Not Found") &&
    org === ""
  ) {
    setOrganization(params.org);
    return <Progress />;
  }

  //preset organization in orgPage state
  setOrgPage({ organization: getOrgNumber(repository.contents?.link ?? "") });

  return (
    <RepoBase
      content={repository.contents?.content}
      org={org}
      link={repository.contents?.link}
    />
  );
}
