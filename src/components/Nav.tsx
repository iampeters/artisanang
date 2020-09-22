import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PrimaryTheme from '../themes/Primary';
import List from './List';
import { Routes } from '../routes'
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers } from '../interfaces/interface';

export default function Nav() {
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector((state: Reducers) => state.user);
  const history = useHistory();
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

    history.push('/profile')
  };

  return (
    <div className="col-md-12 border-right h-inherit" style={{ overflowY: "auto" }}>
      <div className="col-md-12 p-2 mt-3 text-center">
        <Avatar
          className={classes.large + ' mr-auto ml-auto pointer'}
          alt={`${user.firstname} ${user.lastname}`}
          src={user.imageUrl}
          onClick={toggleDrawer} />
      </div>
      <div className="col-md-12 p-2 text-center border-radius">
        <h5 className='mb-0' style={{ color: PrimaryTheme.black, fontFamily: PrimaryTheme.fonts?.boldFont }}>
          <div className="row m-0 justify-content-center align-items-center">
            {`${user.firstname} ${user.lastname}`}

            {user.rating > 0 && user.userType === 2 ? (
            <React.Fragment>
              <svg width=".7em" height=".7em" viewBox="0 0 16 16" className="bi bi-patch-check-fll ml-1" fill={PrimaryTheme.success} xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
              </svg>
            </React.Fragment>
            ) : null}
          </div>
        </h5>
        {/* <h6 className='small' style={{ color: PrimaryTheme.light }}>{user.email}</h6> */}
      </div>

      <div className="col-md-12 p-2 text-center">
        {Routes.map((route, index) => (
          <React.Fragment key={index}>
            {route.userType === user.userType && <List button={false} icon={route.icon} path={route.path} color={location.pathname === route.path && PrimaryTheme.white} name={route.name} className={location.pathname === route.path ? 'Nav-Active' : null} />}
          </React.Fragment>
        ))}
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
