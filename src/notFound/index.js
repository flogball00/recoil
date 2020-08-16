import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  container: {
    textAlign: "center",
    paddingTop: "25px",
  },
});
export default function NotFound() {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="lg">
      <div>Item Not Found</div>
    </Container>
  );
}
