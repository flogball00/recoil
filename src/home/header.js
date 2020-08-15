import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    textAlign: "center",
    padding: "25px",
    fontSize: "50px",
    color: "gray",
  },
});

export default function Header() {
  const classes = useStyles();
  return (
    <Container className={classes.header} maxWidth="lg">
      RepoSearch
    </Container>
  );
}
