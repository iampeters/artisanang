import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Reviews } from '../interfaces/interface';
import CustomizedRatings from './Ratings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

export default function ReviewItemsList(props: Reviews) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start" button onClick={props.onClick}>
        <ListItemAvatar>
          <Avatar alt={`${props.userId?.firstname} ${props.userId?.lastname}`} src={props.userId?.imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <div className="row m-0">
                <div className="col-md-7 p-0">
                  {props.title}
                </div>
                <div className="col-md-5 text-right">
                  <CustomizedRatings rating={props.rating} />
                </div>
              </div>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`${props.userId?.firstname} ${props.userId?.lastname}`}
              </Typography>
              {' - ' + props.description}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
