import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import { Link, useParams } from "react-router-dom";
import PaginationItem from "@material-ui/lab/PaginationItem";
import parse from "parse-link-header";
import queryString from "query-string";
import { useRecoilValue } from "recoil";
import { organization } from "../state";

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
  const params = useParams();
  const [page, setPage] = React.useState(parseInt(params.page) || 1);
  const link = parse(props.link ?? "");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getPageCount = () => {
    return parseInt(link?.last?.page ?? parseInt(link?.prev.page) + 1);
  };

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
                to={`/repositories/${params.org}/${item.page}`}
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
