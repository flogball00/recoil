import React from "react";
import { organization, getRepositories } from "../state";
import { useRecoilValueLoadable, useRecoilValue } from "recoil";
import { Redirect } from "react-router-dom";
import Progress from "../progress";
import NotFound from "../notFound";
export default function RepositoriesHandler() {
  const repository = useRecoilValueLoadable(getRepositories);
  const org = useRecoilValue(organization);

  if (
    repository.state === "hasValue" &&
    repository.contents.message !== "Not Found"
  ) {
    return <Redirect to={`/repositories/${org}`} />;
  } else if (repository.state === "loading") {
    return <Progress />;
  } else {
    return org === "" ? null : <NotFound />;
  }
}
