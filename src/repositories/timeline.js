import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  timelineItem: {
    marginLeft: "-900px",
  },
  timelineContent: {
    borderBottom: "1px solid lightgray",
  },
});
export default function TimelineDisplay(props) {
  const classes = useStyles();
  const getColor = (index) => {
    const colors = ["default", "primary", "secondary"];
    return colors[index % colors.length];
  };
  const getTimeline = (data) => {
    return data?.map((commit, index) => {
      const date = new Date(commit.date);
      return (
        <TimelineItem className={classes.timelineItem}>
          <TimelineSeparator>
            <TimelineDot color={getColor(index)} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContent}>
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
            <div>author: {commit.author}</div>
            <div>description: {commit.message}</div>
          </TimelineContent>
        </TimelineItem>
      );
    });
  };

  return <Timeline>{getTimeline(props.data)}</Timeline>;
}
