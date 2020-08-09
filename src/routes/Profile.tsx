import React from 'react'
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../interfaces/interface';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PrimaryTheme from '../themes/Primary';
import Placeholder from '../components/Skeleton';
import { getUserDetails } from '../redux/Actions/userActions';
import { getDate } from '../helpers/Functions';
import { getArtisans } from '../redux/Actions/artisanActions';
import { getReviews } from '../redux/Actions/reviewAction';
import { Icon, List } from '@material-ui/core';
import SwipeableTemporaryDrawer from '../components/Drawer';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';


export default function Profile() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const artisan = useSelector((state: Reducers) => state.artisan);
  const user = useSelector((state: Reducers) => state.user);
  const reviews = useSelector((state: Reducers) => state.reviews);
  const alert = useSelector((state: Reducers) => state.alert);

  const [state, setState] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  let filter: any = {};
  let paginationConfig = {
    page: 1,
    pageSize: 1,
    whereCondition: JSON.stringify(filter)
  }


  const handleSignOut = () => {

    dispatch({
      type: 'LOADING',
      payload: true
    })

    dispatch({
      type: "USER",
      payload: {}
    })
    dispatch({
      type: "AUTH_TOKEN",
      payload: {}
    })

    sessionStorage.removeItem('auth');
    localStorage.clear();

    window.location.pathname = '/sign-in'
  }

  const navigate = (route: string) => {
    history.push(route)
  }

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(!state);
  };

  const toggleChangePasswordDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(!open);
  };


  React.useEffect(() => {
    filter.userId = user._id;
    paginationConfig.whereCondition = JSON.stringify(filter);

    dispatch(getUserDetails(user._id));
    dispatch(getArtisans(paginationConfig));
    dispatch(getReviews(paginationConfig));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,]);

  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {
        // display error message
        enqueueSnackbar(alert.message, { variant: "error" });

        if (alert.message === 'Network request failed') {
          history.push('/networkError');
        }

        dispatch({
          type: 'ALERT',
          payload: {}
        });

      } else {
        dispatch({
          type: 'ALERT',
          payload: {}
        });
      }
    }
  }, [dispatch, enqueueSnackbar, alert, history]);

  return (
    <div className='animated fadeIn col-md-11 ml-auto mr-auto p-0'>
      <div className='col-md-12 p-0'>
        <div className="row m-0 justify-content-between">
          <h4 className='mb-0' style={{ color: PrimaryTheme.appBar }}>Account</h4>
        </div>
      </div>

      <div className="col-md-12 ml-auto mr-auto p-0 mb-5 mt-5">
        {user ? (
          <div>
            <div className="row mt-4">
              <div className="col-md-4 mb-3">
                <div style={{ backgroundColor: PrimaryTheme.appBar, }} className={classes.card + " p-3 border-radius-bottom-right box-shadow text-center pointer"} onClick={() => navigate(`/my-artisans`)}>
                  {/* row */}
                  <div className="row m-0 justify-content-center align-items-center">
                    <div className="col-3">
                      <Icon style={{ color: PrimaryTheme.white }} fontSize='large'>face</Icon>
                    </div>
                    <div className="col">
                      <h6 className='' style={{ color: PrimaryTheme.light }}>My Artisans</h6>
                      <h4 className='mb-0'>{artisan.total ? artisan.total : 0}</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div style={{ backgroundColor: PrimaryTheme.purple }} className={classes.card + " p-3 border-radius box-shadow text-center pointer"} onClick={() => navigate(`/reviews`)}>
                  {/* row */}
                  <div className="row m-0 justify-content-center align-items-center">
                    <div className="col-3">
                      <Icon style={{ color: PrimaryTheme.white }} fontSize='large'>star</Icon>
                    </div>
                    <div className="col" style={{ color: PrimaryTheme.white }}>
                      <h6 className='' style={{ color: PrimaryTheme.light }}>My Reviews</h6>
                      <h4 className='mb-0'>{reviews.total ? reviews.total : 0}</h4>
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-md-4 mb-3">
                <div style={{ backgroundColor: PrimaryTheme.black }} className={classes.card + " p-3 box-shadow text-center pointer border-radius-bottom-left"} onClick={() => navigate(`/my-jobs`)}>

                  {/* row */}
                  <div className="row m-0 justify-content-center align-items-center">
                    <div className="col-3">
                      <Icon style={{ color: PrimaryTheme.white }} fontSize='large'>business_center</Icon>
                    </div>
                    <div className="col">
                      <h6 className='' style={{ color: PrimaryTheme.light }}>My Jobs</h6>
                      <h4 className='mb-0'>0</h4>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="row mt-4">

              <div className="col-md-8">
                <div className="col-md-12 p-0">

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="col-md-12 border border-radius-bottom-right p-3">
                        <h6 className='display-5 mb-1'>First Name</h6>
                        <p className='mb-0 text-light' style={{ fontSize: 14 }}>{user.firstname}</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="col-md-12 border border-radius-bottom-left p-3">
                        <h6 className='display-5 mb-1'>Last Name</h6>
                        <p className='mb-0 text-light' style={{ fontSize: 14 }}>{user.lastname}</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="col-md-12 border border-radius-bottom-right p-3">
                        <h6 className='display-5 mb-1'>Email</h6>
                        <p className='mb-0 text-light' style={{ fontSize: 14 }}>{user.email}</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="col-md-12 border border-radius-bottom-left p-3">
                        <h6 className='display-5 mb-1'>Phone Number</h6>
                        <p className='mb-0 text-light' style={{ fontSize: 14 }}>{user.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="col-md-12 border border-radius-bottom-right p-3">
                        <h6 className='display-5 mb-1'>Location</h6>
                        <p className='mb-0 text-light' style={{ fontSize: 14 }}>{user.state} {!user.state || !user.country ? 'N/A' : ','} {user.country}</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="col-md-12 border border-radius-bottom-left p-3">
                        <h6 className='display-5 mb-1'>Last Login</h6>
                        <p className='mb-0 text-light' style={{ fontSize: 14 }}>{getDate(user.lastLogin)}</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="col-md-12 border border-radius-bottom-right p-3">
                        <h6 className='display-5 mb-1'>Joined Since</h6>
                        <p className='mb-0 text-light' style={{ fontSize: 14 }}>{getDate(user.createdOn)}</p>
                      </div>
                    </div>

                    {/* <div className="col-md-6 mb-4">
                      <div className="col-md-12 border border-radius-bottom-left p-3">
                        <h5 className='display-5 mb-1'>Lastname</h5>
                        <p className='mb-0 text-light'>John Doe</p>
                      </div>
                    </div> */}

                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="border-radius-bottom-left border overflow-hidden p-2 pl-3 pr-3 mb-3 pointer">
                  <List onClick={toggleDrawer}>
                    <div className="row m-0 justify-content-start align-items-center">
                      <Icon style={{ color: PrimaryTheme.black, marginRight: 5 }}>admin_panel_settings</Icon>
                      <span className='' style={{ fontFamily: PrimaryTheme.fonts?.ProductSansLight, fontSize: 14 }}>Profile Settings
                      </span>
                    </div>
                  </List>
                </div>

                <div className="border-radius-bottom-left border overflow-hidden p-2 pl-3 pr-3 mb-3 pointer">
                  <List onClick={toggleChangePasswordDrawer}>
                    <div className="row m-0 justify-content-start align-items-center">
                      <Icon style={{ color: PrimaryTheme.black, marginRight: 5 }}>lock</Icon>
                      <span className='' style={{ fontFamily: PrimaryTheme.fonts?.ProductSansLight, fontSize: 14 }}>Change Password
                      </span>
                    </div>
                  </List>
                </div>

                <div className="border-radius-bottom-left border overflow-hidden p-2 pl-3 pr-3 mb-3 pointer">
                  <List onClick={handleSignOut}>
                    <div className="row m-0 justify-content-start align-items-center">
                      <Icon style={{ color: PrimaryTheme.danger, marginRight: 5 }}>power_settings_new</Icon>
                      <span className='' style={{ fontFamily: PrimaryTheme.fonts?.ProductSansLight, color: PrimaryTheme.danger, fontSize: 14 }}>Log Out</span>
                    </div>
                  </List>
                </div>
              </div>
            </div>
            {/*Profile Drawer */}
            <SwipeableTemporaryDrawer anchor='right' state={state} toggleDrawer={toggleDrawer}>
              <EditProfile />
            </SwipeableTemporaryDrawer>

            {/*Change Password Drawer */}
            <SwipeableTemporaryDrawer anchor='right' state={open} toggleDrawer={toggleChangePasswordDrawer}>
              <ChangePassword />
            </SwipeableTemporaryDrawer>
          </div>

        ) : (
            <React.Fragment>
              <Placeholder variant="text" width={120} height={50} animation='pulse' className="col-md-4 mb-1" />
              <Placeholder variant="text" width={150} height={50} animation='wave' className="col-md-4 mb-1" />
              <Placeholder variant="text" width={120} height={50} animation='wave' className="col-md-4 mb-3" />

              <div className="row m-0">
                <div className="col-md-6">
                  <Placeholder variant="text" width={'100%'} height={150} animation='wave' className="mr-auto ml-auto" />
                </div>
                <div className="col-md-6">
                  <Placeholder variant="text" width={'100%'} height={150} animation='wave' className="mr-auto ml-auto" />
                </div>

                <div className="col-md-12">
                  <Placeholder variant="text" width={'100%'} height={200} animation='wave' className="mr-auto ml-auto" />
                </div>
              </div>
            </React.Fragment>

          )}
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
    }, paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    }, button: {
      marginRight: theme.spacing(1),
      marginLeft: 0,
      width: theme.spacing(6),
      height: theme.spacing(6),
    }, fab: {
      bottom: 0,
      right: 20,
    }, card: {
      backgroundImage: 'url(/bg.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'right center',
      color: 'white',
    }
  }),
);

