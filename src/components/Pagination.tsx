import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { Pagination as PaginationProps } from '../interfaces/interface';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function PaginationControlled(props: PaginationProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={props.total} page={props.page} onChange={props.onChange} />
    </div>
  );
}
