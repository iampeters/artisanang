import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ListItemSecondaryAction, Icon } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      padding: 0
    },
  }),
);

export default function AssignJob(props: ListProps) {
  const classes = useStyles();

  return (
    <List className={classes.root + ' col-md-10 ml-auto mr-auto border-radius-10 box-shadow mb-3'}>

      <ListItem>
        <ListItemAvatar>
          {!props.image ?
            <Avatar>
              <Icon>business_center</Icon>
            </Avatar> :
            <Avatar src={props.image} />
          }
        </ListItemAvatar>

        <ListItemText primary={props.title} secondary={props.rating + " Stars"} />

        <ListItemSecondaryAction className="d-none d-md-inline">
          <span onClick={props.onAssign} className={'badge badge-pill p-2 pl-3 pr-3 mr-1 pointer badge-' + props.color}>{props.status}</span>
          <span className={'badge badge-pill p-2 pl-3 pr-3 badge-warning pointer'} onClick={props.onView}>View</span>
        </ListItemSecondaryAction>

      </ListItem>
      <div className="row m-0 d-md-none">
        <div className="col-6 p-0">
          <button className={'w-100 btn p-2 pl-3 pr-3 mr-1 border-radius-none pointer btn-success '} onClick={props.onAssign}>{props.status}</button>
        </div>
        <div className="col-6 p-0">
          <button className={'w-100 btn p-2 pl-3 pr-3 btn-warning pointer border-radius-none'} onClick={props.onView}>View</button>
        </div>
      </div>

    </List>
  );
}

interface ListProps {
  color?: "success" | "warning" | "info" | "danger";
  status?: string;
  title: string;
  rating?: number;
  image?: string;
  onView?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | any;
  onAssign?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | any;
}
