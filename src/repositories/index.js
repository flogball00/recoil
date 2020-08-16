import React from "react";
import {
  getRepositories,
  organization,
  getNextPageRepositories,
} from "../state";
import { useRecoilValueLoadable, useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import Progress from "../progress";
import RepoBase from "./repoBase";

export function Repositories() {
  const repository = useRecoilValueLoadable(getRepositories);
  const params = useParams();
  const [org, setOrganization] = useRecoilState(organization);
  if (
    (repository.state === "hasError" ||
      repository.contents.message === "Not Found") &&
    org === ""
  ) {
    setOrganization(params.org);
  }
  return (
    <RepoBase
      content={repository.contents?.content}
      org={org}
      link={repository.contents?.link}
    />
  );
}

export function PaginatedRepositories() {
  const params = useParams();
  const repository = useRecoilValueLoadable(getRepositories);
  const link = repository?.contents?.link || "";
  const pattern = /([0-9]+)/g;
  const numbers = link.match(pattern) || [];
  const orgPage = {
    organization: numbers.length && numbers[0],
    page: params?.page,
  };
  const paginatedRepo = useRecoilValue(getNextPageRepositories(orgPage));
  const [org, setOrganization] = useRecoilState(organization);

  if (repository?.state === "loading" || paginatedRepo?.state === "loading") {
    return <Progress />;
  } else if (
    (repository.state === "hasError" ||
      repository.contents.message === "Not Found") &&
    org === ""
  ) {
    setOrganization(params.org);
  }

  return (
    <RepoBase
      content={paginatedRepo?.content}
      org={org}
      link={paginatedRepo?.link}
    />
  );
}
