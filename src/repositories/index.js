import React, { useState } from "react";
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

function getOrgNumber(link) {
  const pattern = /([0-9]+)/g;
  const numbers = link.match(pattern) || [];
  return numbers[0];
}

export function Repositories() {
  const repository = useRecoilValueLoadable(getRepositories);
  const params = useParams();
  const setOrgPage = useSetRecoilState(orgPage);
  setOrgPage({ organization: repository.contents.link });
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
  const setOrgPage = useSetRecoilState(orgPage);
  const paginatedRepo = useRecoilValueLoadable(getNextPageRepositories);
  const [org, setOrganization] = useRecoilState(organization);

  if (repository.state === "loading") {
    return <Progress />;
  } else if (
    (repository.state === "hasError" ||
      repository.contents.message === "Not Found") &&
    org === ""
  ) {
    setOrganization(params.org);
    return <Progress />;
  } else if (
    repository.state === "hasValue" &&
    paginatedRepo?.contents?.message === "Not Found"
  ) {
    setOrgPage({
      organization: getOrgNumber(repository?.contents?.link || ""),
      page: params?.page,
    });
    return <Progress />;
  } else if (paginatedRepo.state === "hasValue") {
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
