import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
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

      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography
          className={classes.typography}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {props.description}
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

// function RepoCard(props) {
//   return (
//     <div>
//       <div>name: {props.name}</div>
//       <div>owner: {props.owner.login}</div>
//       <div>avatar_url: {props.owner.avatar_url}</div>
//       <div>description: {props.description}</div>
//       <div>stars: {props.stargazers_count}</div>
//       <div>forks: {props.forks}</div>
//       <div>watchers: {props.watchers}</div>
//       <div>created: {props.created_at}</div>
//       <div>updated_at: {props.updated_at}</div>
//       <div>url: {props.url}</div>
//     </div>
//   );
// }
