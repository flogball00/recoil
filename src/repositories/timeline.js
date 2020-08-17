import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { formatDescription } from "../utils/data-processing";

const useStyles = makeStyles({
  timelineItem: {
    marginLeft: "-900px",
  },
  paper: {
    padding: "8px",
  },
});
export default function TimelineDisplay(props) {
  const classes = useStyles();
  const getColor = (index) => {
    const colors = ["grey", "primary", "secondary"];
    return colors[index % colors.length];
  };
  const getTimeline = (data) => {
    return data?.map((commit, index) => {
      const date = new Date(commit.date);
      return (
        <TimelineItem key={commit.sha} className={classes.timelineItem}>
          <TimelineSeparator>
            <TimelineDot color={getColor(index)} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper className={classes.paper} elevation={2}>
              <div>
                commit:{" "}
                {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
              </div>
              <div>
                sha:{" "}
                <Link onClick={() => window.open(commit.url, "_blank")}>
                  {commit.sha}
                </Link>
              </div>
              <div>
                author:{" "}
                <Link onClick={() => window.open(commit.authorUrl, "_blank")}>
                  {commit.author}
                </Link>
              </div>
              <div>description: {formatDescription(commit.message)}</div>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    });
  };

  return <Timeline>{getTimeline(props.data)}</Timeline>;
}
