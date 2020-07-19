import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { Routes } from '../interfaces/interface';
import { NavLink } from 'react-router-dom';


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

export default function NestedList(props: Routes) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);


  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <NavLink to={props.path}>

        <ListItem button>
          <ListItemIcon>
            <Icon style={{ color: props.color }}>{props.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={props.name} style={{ color: props.color }} />
        </ListItem>
      </NavLink>
    </List>
  );
}
