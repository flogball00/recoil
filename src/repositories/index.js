import React from "react";
import {
  getRepositories,
  organization,
  getNextPageRepositories,
} from "../state";
import { useRecoilValueLoadable, useRecoilState, useRecoilValue } from "recoil";
import RepoCard from "./repoCard";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Search from "../search";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import RepositoryPagination from "./repositoryPagination";
import Progress from "../progress";

const useStyles = makeStyles({
  cardContainer: {
    height: "100%",
  },
  searchContainer: {
    textAlign: "center",
    padding: "10px 0",
  },
  typography: {
    textAlign: "center",
    height: "100px",
    marginTop: "50px",
    fontSize: "30px",
    fontWeight: "400",
  },
});

export function Repositories() {
  const repository = useRecoilValueLoadable(getRepositories);
  const classes = useStyles();
  const params = useParams();
  const [org, setOrganization] = useRecoilState(organization);

  switch (repository.state) {
    case "hasError":
      setOrganization(params.org);
      break;
    default:
      return (
        <React.Suspense fallback={<></>}>
          <Container className={classes.searchContainer}>
            <Search clearable={true} />
          </Container>
          <Divider />
          <Typography
            className={classes.typography}
            variant="body2"
            color="textSecondary"
            component="h2"
          >
            Repository Results for {org}
          </Typography>
          <Container className={classes.cardContainer} maxWidth="lg">
            {repository.contents?.content?.map((repo) => (
              <RepoCard key={repo.name} {...repo} />
            ))}
          </Container>
          <RepositoryPagination link={repository.contents.link} />
        </React.Suspense>
      );
  }
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
  const classes = useStyles();
  const [org, setOrganization] = useRecoilState(organization);

  if (repository?.state === "hasError" || paginatedRepo?.state === "hasError") {
    setOrganization(params.org);
    return null;
  } else if (
    repository?.state === "loading" ||
    paginatedRepo?.state === "loading"
  ) {
    return <Progress />;
  } else {
    return (
      <React.Suspense fallback={<></>}>
        <Container className={classes.searchContainer}>
          <Search clearable={true} />
        </Container>
        <Divider />
        <Typography
          className={classes.typography}
          variant="body2"
          color="textSecondary"
          component="h2"
        >
          Repository Results for {org}
        </Typography>
        <Container className={classes.cardContainer} maxWidth="lg">
          {paginatedRepo?.content?.map((repo) => (
            <RepoCard key={repo.name} {...repo} />
          ))}
        </Container>
        <RepositoryPagination link={paginatedRepo?.link} />
      </React.Suspense>
    );
  }
}
