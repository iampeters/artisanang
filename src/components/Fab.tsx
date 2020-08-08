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

export default function FloatingActionButtons(props: FABProps) {
  const classes = useStyles();

  return (
    <div className={classes.root + ' mb-3'}>
      <Fab style={{ background: props.customColor }} color={props.color} aria-label={props.label} variant={props.variant} onClick={props.onClick}>
        <Icon style={{ color: props.IconColor, marginRight: props.marginRight }}>{props.IconName}</Icon>
        <Typography className='text-capitalize'> {props.IconText}</Typography>
      </Fab>
    </div>
  );
}

interface FABProps {
  variant: "round" | "extended" | undefined;
  label?: string;
  onClick?: any;
  IconName: string;
  color?: "inherit" | "default" | "primary" | "secondary" | undefined;
  IconText?: string;
  customColor?: string;
  IconColor?: string;
  marginRight?: number;
}