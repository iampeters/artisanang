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

export default function FolderList(props: ListProps) {
  const classes = useStyles();

  return (
    <List className={classes.root + ' border-radius-10 box-shadow mb-3'}>

      <ListItem button onClick={props.onClick}>
        <ListItemAvatar>
          {!props.image ?
            <Avatar>
              <Icon>business_center</Icon>
            </Avatar> :
            <Avatar src={props.image} />
            }
        </ListItemAvatar>

        <ListItemText primary={props.title} secondary={props.createdOn} />

        <ListItemSecondaryAction>
          {/* <IconButton edge="end" aria-label="delete"> */}
          <span className={'badge badge-pill p-2 pl-3 pr-3 badge-' + props.color}>{props.status}</span>
          {/* </IconButton> */}
        </ListItemSecondaryAction>
      </ListItem>

    </List>
  );
}

interface ListProps {
  color?: "success" | "warning" | "info" | "danger";
  status?: string;
  title: string;
  createdOn?: string;
  image?: string;
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}
