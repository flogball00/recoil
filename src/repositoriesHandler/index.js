import React from "react";
import { organization, getRepositories } from "../state";
import { useRecoilValueLoadable, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Progress from "../progress";
const useStyles = makeStyles({
  container: {
    textAlign: "center",
    paddingTop: "25px",
  },
});
export default function RepositoriesHandler() {
  const repository = useRecoilValueLoadable(getRepositories);
  const org = useRecoilValue(organization);
  const history = useHistory();
  const classes = useStyles();

  switch (repository.state) {
    case "hasValue":
      history.push(`/repositories/${org}`);
      return null;
    case "loading":
      return <Progress />;
    case "hasError":
      return org === "" ? null : (
        <Container className={classes.container} maxWidth="lg">
          <div>Organization Not Found</div>
        </Container>
      );
    default:
      return <></>;
  }
}
