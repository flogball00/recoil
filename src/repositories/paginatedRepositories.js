import React, { useEffect } from "react";
import { getNextPageRepositories, orgPage } from "../state";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import RepoBase from "./repoBase";

export default function PaginatedRepositories() {
  const params = useParams();
  const setOrgPage = useSetRecoilState(orgPage);
  const repository = useRecoilValueLoadable(getNextPageRepositories);
  useEffect(() => {
    setOrgPage({ page: params.page, org: params.org });
  }, [params, setOrgPage]);
  return (
    <RepoBase
      content={repository?.contents?.content}
      org={params.org}
      link={repository?.contents?.link}
    />
  );
}
