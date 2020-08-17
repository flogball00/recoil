import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import StarIcon from "@material-ui/icons/Star";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import LaunchIcon from "@material-ui/icons/Launch";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { githubClient } from "../utils/api";
import Progress from "../progress";
import NotFound from "../notFound";
import TimelineDisplay from "./timeline";
import {
  formatCommitResponse,
  formatDescription,
} from "../utils/data-processing";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      margin: "10px 0",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    typography: {
      textAlign: "left",
    },
  })
);

export default function RepoCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const params = useParams();
  const [commitData, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const resp = await githubClient(
        `repos/${params.org}/${props.name}/commits`
      );
      setData(formatCommitResponse(resp));
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  const handleExpandClick = () => {
    !expanded && fetchData();
    setExpanded(!expanded);
  };
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={props.owner.avatar_url}
            aria-label="recipe"
            className={classes.avatar}
          ></Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={() => window.open(props.url, "_blank")}
          >
            <LaunchIcon />
          </IconButton>
        }
        title={props.name}
        subheader={`Org: ${props.owner.login}`}
      />
      <Divider />
      <CardContent>
        <Typography
          className={classes.typography}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {formatDescription(props.description)}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        <IconButton disabled={true}>
          <StarIcon />: {props.stars}
        </IconButton>
        <IconButton disabled={true}>
          <ShareIcon />: {props.forks}
        </IconButton>
        <IconButton disabled={true}>
          <VisibilityIcon />: {props.watchers}
        </IconButton>
        <IconButton disabled={true}>
          Last Updated: {new Date(props.updated).toDateString()}
        </IconButton>
        <IconButton disabled={true}>Language: {props.language}</IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {isLoading && <Progress />}
          {error && <NotFound />}
          <TimelineDisplay data={commitData} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
