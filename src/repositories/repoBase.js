import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RepoCard from "./repoCard";
import Container from "@material-ui/core/Container";
import Search from "../search";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import RepositoryPagination from "./repositoryPagination";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { organization } from "../state";
import { useSetRecoilState } from "recoil";

const useStyles = makeStyles({
  cardContainer: {
    height: "100%",
  },
  home: {
    float: "left",
    display: "relative",
    marginLeft: "40px",
    padding: "25px",
    fontSize: "20px",
    color: "gray",
  },
  searchContainer: {
    textAlign: "center",
    padding: "10px 0",
  },
  typography: {
    height: "100px",
    marginTop: "50px",
    fontSize: "30px",
    fontWeight: "400",
    textAlign: "center",
  },
});

export default function RepoBase(props) {
  const setOrg = useSetRecoilState(organization);
  const classes = useStyles();
  return (
    <React.Suspense fallback={<></>}>
      <Button
        className={classes.home}
        onClick={() => {
          setOrg("");
        }}
        component={RouterLink}
        to="/"
      >
        RepoSearch
      </Button>
      <Container className={classes.searchContainer}>
        <Search clearable={true} useHistory={true} />
      </Container>
      <Divider />
      <Typography
        className={classes.typography}
        variant="body2"
        color="textSecondary"
        component="h2"
      >
        Repository Results for {props.org}
      </Typography>
      <Container className={classes.cardContainer} maxWidth="lg">
        {props.content?.map((repo) => (
          <RepoCard key={repo.name} {...repo} />
        )) ?? <></>}
      </Container>
      <RepositoryPagination link={props?.link} />
    </React.Suspense>
  );
}
