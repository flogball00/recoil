import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import { Link, useParams } from "react-router-dom";
import PaginationItem from "@material-ui/lab/PaginationItem";
import parse from "parse-link-header";
import { orgPage } from "../state";
import { useRecoilState } from "recoil";

const useStyles = makeStyles({
  container: {
    display: "flex",
    padding: "25px 0",
    justifyContent: "center",
  },
  pagination: {
    minWidth: "500px",
  },
});

export default function RepositoryPagination(props) {
  const classes = useStyles();
  const params = useParams();
  const [op, setOrgPage] = useRecoilState(orgPage);
  const [page, setPage] = useState(parseInt(params.page) || 1);
  const link = parse(props.link ?? "");
  const handleChange = (_, value) => {
    const newOP = { ...op };
    newOP.page = value;
    setOrgPage(newOP);
    setPage(value);
  };
  const getPageCount = (link) => {
    return parseInt(link.last?.page ?? parseInt(link.prev.page) + 1);
  };

  return parseInt(link?.last?.page) > 1 || link?.prev ? (
    <Container className={classes.container}>
      <Pagination
        className={classes.pagination}
        count={getPageCount(link)}
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
    </Container>
  ) : null;
}
