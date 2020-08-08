import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PrimaryTheme from '../themes/Primary';
import List from './List';
import { Routes } from '../routes'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Reducers } from '../interfaces/interface';

export default function Nav() {
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector((state: Reducers) => state.user);

  return (
    <div className="col-md-12 border-right h-inherit" style={{ overflowY: "auto" }}>
      <div className="col-md-12 p-2 mt-3 text-center">
        <Avatar
          className={classes.large + ' mr-auto ml-auto'}
          alt={`${user.firstname} ${user.lastname}`}
          src={user.imageUrl} />
      </div>
      <div className="col-md-12 p-2 text-center border-radius">
        <h5 className='mb-0' style={{ color: PrimaryTheme.appBar }}>
          {`${user.firstname} ${user.lastname}`}
        </h5>
        {/* <h6 className='small' style={{ color: PrimaryTheme.light }}>{user.email}</h6> */}
      </div>

      <div className="col-md-12 p-2 text-center">
        {Routes.map((route, index) => <List key={index} button={false} icon={route.icon} path={route.path} color={location.pathname === route.path && PrimaryTheme.white} name={route.name} className={location.pathname === route.path ? 'Nav-Active' : null} />)}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }),
);
