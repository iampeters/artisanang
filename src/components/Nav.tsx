import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PrimaryTheme from '../themes/Primary';
import List from './List';
import { Routes } from '../routes'
import { useLocation } from 'react-router-dom';

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

export default function Nav() {
  const classes = useStyles();
  // const path = window.location.pathname;
  const location = useLocation();

  return (
    <div>
      <div className="col-md-12 p-2 text-center">
        <Avatar className={classes.large + ' mr-auto ml-auto'} alt="John Doe" src="https://avatars3.githubusercontent.com/u/24472484?s=460&u=bb7c81f37704b584029e0aa21d5f02d48a84ad2f&v=4" />
        {/* https://avatars3.githubusercontent.com/u/24472484?s=460&u=bb7c81f37704b584029e0aa21d5f02d48a84ad2f&v=4 */}
      </div>
      {/* <div className="col-md-12 p-2 text-center border-radius bg-light">
        <h3 className='mb-0' style={{ color: PrimaryTheme.dark }}>John Doe</h3>
        <h6 style={{ color: PrimaryTheme.light }}>John Doe</h6>
      </div> */}

      <div className="col-md-12 p-2 text-center">
        {Routes.map((route, index) => <List key={index} icon={route.icon} path={route.path} color={location.pathname === route.path && PrimaryTheme.active} name={route.name} />)}
      </div>
    </div>
  )
}
