import React from 'react'
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../interfaces/interface';
import { Icon } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PrimaryTheme from '../themes/Primary';
import FloatingActionButtons from '../components/Fab';
import Placeholder from '../components/Skeleton';
import { getUserDetails } from '../redux/Actions/userActions';
import { getDate } from '../helpers/Functions';
import { getArtisans } from '../redux/Actions/artisanActions';
import { getReviews } from '../redux/Actions/reviewAction';

export default function Profile() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const artisan = useSelector((state: Reducers) => state.artisan);
  const user = useSelector((state: Reducers) => state.user);
  const reviews = useSelector((state: Reducers) => state.reviews);
  const alert = useSelector((state: Reducers) => state.alert);

  let filter: any = {};
  let paginationConfig = {
    page: 1,
    pageSize: 1,
    whereCondition: JSON.stringify(filter)
  }

  const handleClick = () => {
    history.push(`/profile/edit`)
  }

  const navigate = (route: string) => {
    history.push(route)
  }

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
    <div className='animated fadeIn'>
      <div className='col-md-12'>
        <h4 className='mb-0' style={{ color: PrimaryTheme.appBar }}>Profile</h4>
      </div>

      <div className="col-md-9 ml-auto mr-auto p-0 mb-5">
        {user ? (
          <div>
            {/* <Avatar
              className={classes.large + ' mr-auto ml-auto mb-1'}
              alt={`${user.firstname} ${user.lastname}`}
              src={user.imageUrl} />

            <div className="col-md-12">
              <h5 className='text-center mt-3 mb-0' style={{ color: PrimaryTheme.appBar }}>{`${user.firstname} ${user.lastname}`}</h5>
              <p className='text-center note small text-light mb-0'>{user.email}</p>
              <p className='text-center note small text-light mb-0'>{user.phoneNumber}</p>
            </div> */}

            {/* <div className="col-md-5 ml-auto mr-auto p-2 text-center border-radius">

              <Tooltip title="Call Artisan" aria-label="call">
                <IconButton
                  edge="start"
                  className={classes.button}
                  color="inherit"
                  aria-label="Call Artisan"
                >
                  <Icon style={{ color: PrimaryTheme.primary, fontSize: 30 }} >local_phone</Icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Email Artisan" aria-label="email">
                <IconButton
                  edge="start"
                  className={classes.button}
                  color="inherit"
                  aria-label="Email Artisan"
                >

                  <Icon style={{ color: PrimaryTheme.primary, fontSize: 30 }} >email</Icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Report Artisan" aria-label="report">
                <IconButton
                  edge="start"
                  className={classes.button}
                  color="inherit"
                  aria-label="Report"
                >
                  <Icon style={{ color: PrimaryTheme.primary, fontSize: 30 }} >report</Icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Share" aria-label="report">
                <IconButton
                  edge="start"
                  className={classes.button}
                  color="inherit"
                  aria-label="Share"
                >
                  <Icon style={{ color: PrimaryTheme.primary, fontSize: 30 }} >share</Icon>
                </IconButton>
              </Tooltip>

            </div> */}
            <div className="row m-0 mt-4">
              <div className="col-md-4 mb-3">
                <div className={" p-2 bg-white border-radius box-shadow text-center pointer"} onClick={() => navigate(`/my-artisans`)}>
                  {/* row */}
                  <div className="row m-0 justify-content-center align-items-center">
                    <div className="col-3">
                      <Icon style={{ color: PrimaryTheme.appBar }} fontSize='large'>person</Icon>
                    </div>
                    <div className="col">
                      <h6 className='' style={{ color: PrimaryTheme.appBar }}>My Artisans</h6>
                      <h4 className='mb-0'>{artisan.total ? artisan.total : 0}</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className={" p-2 bg-white border-radius box-shadow text-center pointer"} onClick={() => navigate(`/reviews`)}>
                  {/* row */}
                  <div className="row m-0 justify-content-center align-items-center">
                    <div className="col-3">
                      <Icon style={{ color: PrimaryTheme.appBar }} fontSize='large'>star</Icon>
                    </div>
                    <div className="col">
                      <h6 className='' style={{ color: PrimaryTheme.appBar }}>My Reviews</h6>
                      <h4 className='mb-0'>{reviews.total ? reviews.total : 0}</h4>
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-md-4 mb-3">
                <div className={" p-2 bg-white border-radius box-shadow text-center pointer"} onClick={() => navigate(`/my-jobs`)}>

                  {/* row */}
                  <div className="row m-0 justify-content-center align-items-center">
                    <div className="col-3">
                      <Icon style={{ color: PrimaryTheme.appBar }} fontSize='large'>work</Icon>
                    </div>
                    <div className="col">
                      <h6 className='' style={{ color: PrimaryTheme.appBar }}>My Jobs</h6>
                      <h4 className='mb-0'>0</h4>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="table-responsive mt-5">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th scope="row">First Name</th>
                    <td>{user.firstname}</td>
                  </tr>
                  <tr>
                    <th scope="row">Last Name</th>
                    <td>{user.lastname}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phone Number</th>
                    <td>{user.phoneNumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">Location</th>
                    <td>{user.state}, {user.country}</td>
                  </tr>
                  <tr>
                    <th scope="row">Last Login</th>
                    <td>{getDate(user.lastLogin)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Joined Since</th>
                    <td>{getDate(user.createdOn)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        ) : (
            <React.Fragment>
              <Placeholder variant="text" width={120} height={50} animation='pulse' classes="col-md-4 mb-1" />
              <Placeholder variant="text" width={150} height={50} animation='wave' classes="col-md-4 mb-1" />
              <Placeholder variant="text" width={120} height={50} animation='wave' classes="col-md-4 mb-3" />

              <div className="row m-0">
                <div className="col-md-6">
                  <Placeholder variant="text" width={'100%'} height={150} animation='wave' classes="mr-auto ml-auto" />
                </div>
                <div className="col-md-6">
                  <Placeholder variant="text" width={'100%'} height={150} animation='wave' classes="mr-auto ml-auto" />
                </div>

                <div className="col-md-12">
                  <Placeholder variant="text" width={'100%'} height={200} animation='wave' classes="mr-auto ml-auto" />
                </div>
              </div>
            </React.Fragment>

          )}
      </div>

      <div className={classes.fab} style={{ position: 'fixed' }}>
        <div className="row m-0 justify-content-end align-items-center">
          <FloatingActionButtons IconName="edit" IconText="Edit Profile" onClick={handleClick} />
        </div>
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
    }
  }),
);

