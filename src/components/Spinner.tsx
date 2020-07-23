import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import PrimaryTheme from '../themes/Primary';

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      top: 5
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: PrimaryTheme.primary,
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
      // top: 5
    },
    circle: {
      strokeLinecap: 'round',
    },
  }),
);

export default function Spinner(props: CircularProgressProps) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={30}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={30}
        thickness={4}
        {...props}
      />
    </div>
  );
}