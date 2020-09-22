import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { Routes } from '../interfaces/interface';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PrimaryTheme from '../themes/Primary';

export default function NestedList(props: Routes) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch({
      type: 'TOGGLE_NAVBAR',
      payload: false
    })
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
      onClick={toggleDrawer}
    >
      <NavLink to={props.path}>
        <ListItem button={props.button} className={props.className} style={{ transition: 'all .25s' }}>
          <ListItemIcon>
            <Icon style={{ color: props.color }}>{props.icon}</Icon>
          </ListItemIcon>
          <ListItemText disableTypography primary={props.name} style={{ color: props.color, fontFamily: PrimaryTheme.fonts?.boldFont }} />
        </ListItem>
      </NavLink>
    </List>
  );
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);