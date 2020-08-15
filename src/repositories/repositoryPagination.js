import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import { Link, useLocation } from "react-router-dom";
import PaginationItem from "@material-ui/lab/PaginationItem";
import parse from "parse-link-header";
import queryString from "query-string";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    padding: "25px 250px 150px",
  },
  pagination: {
    minWidth: "500px",
  },
});
export default function RepositoryPagination(props) {
  const classes = useStyles();
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const [page, setPage] = React.useState(parseInt(qs.page) || 1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const linkString = props.link ?? "";
  const pattern = /([0-9]+)/g;
  const numbers = linkString.match(pattern);

  const link = parse(props.link ?? "");

  function getPageCount() {
    return parseInt(link?.last?.page ?? parseInt(link?.prev.page) + 1);
  }
  return (
    <Container className={classes.container}>
      {parseInt(link?.last?.page) > 1 || link?.prev ? (
        <Pagination
          className={classes.pagination}
          count={getPageCount()}
          variant="outlined"
          color="primary"
          page={parseInt(page)}
          onChange={handleChange}
          renderItem={(item) => {
            return (
              <PaginationItem
                component={Link}
                to={`/organizations/${numbers[0]}/repos?page=${item.page}`}
                {...item}
              />
            );
          }}
        />
      ) : (
        <></>
      )}
    </Container>
  );
}
