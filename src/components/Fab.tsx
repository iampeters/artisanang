import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import PrimaryTheme from '../themes/Primary';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default function FloatingActionButtons(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root + ' mb-3'}>
      <Fab style={{background: PrimaryTheme.primary}} color='secondary' aria-label="add" variant='extended' onClick={props.onClick}>
        <Icon style={{color: PrimaryTheme.white, marginRight: 5}}>{props.IconName}</Icon> <Typography className='text-capitalize'> {props.IconText}</Typography>
      </Fab>
    </div>
  );
}
