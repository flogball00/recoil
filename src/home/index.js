import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./header";
import Container from "@material-ui/core/Container";
import Search from "../search";
const useStyles = makeStyles({
  container: {
    height: "100%",
    textAlign: "center",
    paddingTop: "250px",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="lg">
      <Header />
      <Search showButton={true} />
    </Container>
  );
}
