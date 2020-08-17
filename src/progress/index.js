import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    paddingTop: "25px",
  },
});

export default function Progress() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="lg">
      <CircularProgress />
    </Container>
  );
}
