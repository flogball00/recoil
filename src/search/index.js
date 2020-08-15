import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { organization } from "../state";
import Container from "@material-ui/core/Container";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles({
  container: {
    height: "100%",
    textAlign: "center",
    paddingTop: "250px",
  },
  textField: {
    width: "500px",
  },
  searchIcon: {
    padding: "5px",
    border: "1px solid",
    height: "44px",
    borderTopLeftRadius: ".4em",
    borderBottomLeftRadius: ".4em",
    marginRight: "-2px",
  },
  clearIcon: {
    padding: "5px",
    border: "1px solid",
    height: "44px",
    borderTopRightRadius: ".4em",
    borderBottomRightRadius: ".4em",
    marginLeft: "-2px",
  },
  buttonContainer: {
    marginTop: "15px",
  },
  button: {
    marginLeft: "-9px",
    marginTop: "-47px",
  },
});
export default function Search(props) {
  const [org, setOrganization] = useRecoilState(organization);
  const [inputOrg, setInputOrg] = useState(org);
  const classes = useStyles();
  const textInput = useRef(null);

  const onSubmit = (e) => {
    console.log("click");
    e.preventDefault();
    setOrganization(inputOrg);
  };
  const handleClick = () => {
    setInputOrg("");
    textInput.current.focus();
  };
  return (
    <form onSubmit={onSubmit}>
      <SearchIcon
        className={classes.searchIcon}
        fontSize="large"
        color="action"
      />
      <TextField
        className={classes.textField}
        inputRef={textInput}
        variant="outlined"
        value={inputOrg}
        onChange={(e) => setInputOrg(e.target.value)}
      ></TextField>
      {inputOrg.length && props.clearable ? (
        <Button className={classes.button} onClick={() => handleClick()}>
          <ClearIcon
            className={classes.clearIcon}
            fontSize="large"
            color="action"
          />
        </Button>
      ) : null}
      {props.showButton && (
        <Container className={classes.buttonContainer}>
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Container>
      )}
    </form>
  );
}
