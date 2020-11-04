import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Reducers, Reviews } from '../interfaces/interface';
import CustomizedRatings from './Ratings';
import { useSelector } from 'react-redux';

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
  const user = useSelector((state: Reducers) => state.user)

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
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
                  <div className="row flex-column m-0 justify-content-center align-items-center">
                    <CustomizedRatings rating={props.rating} />
                    <div>
                    {props.userId && props.userId._id !== user._id && <button className="btn mb-1 btn-success badge-pill pl-3 pr-3 mr-3">Chat user</button>}
                    {/* <button className="btn  btn-warning badge-pill pl-3 pr-3" onClick={props.onClick}>View</button> */}
                    </div>
                  </div>
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
