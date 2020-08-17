import React from "react";
import { getRepositories, organization } from "../state";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import Progress from "../progress";
import RepoBase from "./repoBase";

export default function Repositories() {
  const repository = useRecoilValueLoadable(getRepositories);
  const params = useParams();
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

  return (
    <RepoBase
      content={repository.contents?.content}
      org={org}
      link={repository.contents?.link}
    />
  );
}
