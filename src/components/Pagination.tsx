import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';
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
      {/* <Pagination count={props.total} page={props.page} onChange={props.onChange} /> */}
      <TablePagination
        component="div"
        count={props.total}
        page={props.page}
        onChangePage={props.onChange}
        rowsPerPage={props.pageSize}
        rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500]}
        onChangeRowsPerPage={props.onPageSizeChange}
      />
    </div>
  );
}