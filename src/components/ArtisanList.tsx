import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { Artisans } from '../interfaces/interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    }, large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  }),
);

export default function ArtisanList(props: Artisans) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.large} alt={`${props.firstname} ${props.lastname}`} src={props.imageUrl} />
        </ListItemAvatar>
        <ListItemText primary={`${props.firstname} ${props.lastname}`} secondary={props.specialization} />
      </ListItem>
    </List>
  );
}
