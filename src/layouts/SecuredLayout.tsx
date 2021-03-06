import React from 'react'
import SecuredAppBar from '../components/Header'
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import { Switch, Route, useHistory } from 'react-router-dom';
import Dashboard from '../routes/Dashboard';
import Jobs from '../routes/Jobs';
import MyReviews from '../routes/MyReviews';
import Profile from '../routes/Profile';
import ArtisanDetails from '../routes/ArtisanDetails';
import Notifications from '../routes/Notifications';
import NotificationDetails from '../routes/NotificationDetails';
import MessageDetails from '../routes/MessageDetails';
import Messages from '../routes/Messages';
import AddArtisan from '../routes/AddArtisan';
import PrimaryTheme from '../themes/Primary';
import { Backdrop, makeStyles, Theme, createStyles } from '@material-ui/core';
import Spinner from '../components/Spinner';
import { Reducers } from '../interfaces/interface';
import NetworkFailed from '../routes/NetworkFailed';
import AddReview from '../routes/AddReview';
import ReviewDetails from '../routes/ReviewDetails';
import EditProfile from '../routes/EditProfile';
import Home from '../routes/Home';
import Category from '../routes/Category';
import MyArtisans from '../routes/MyArtisans';
import ErrorPageSecured from '../routes/ErrorPageSecured';
import JobDetails from '../routes/JobDetails';
import AddJob from '../routes/AddJob';

export default function SecuredLayout() {
  const classes = useStyles();
  const loading = useSelector((state: Reducers) => state.loading)
  const auth = useSelector((state: any) => state.auth);
  const menuToggle = useSelector((state: any) => state.menu);
  const history = useHistory();


  React.useEffect(() => {
    if (!auth) {
      history.push('/');
    }
  })

  return (
    <div>
      {/* header */}
      <SecuredAppBar />

      <div className="container-fluid">
        <div className="row">
          <div className={"col-3 d-none " + menuToggle} style={{ position: 'relative', }}>
            <div className="col-md-3 sideBar p-0 bg-white">
              <Nav />
            </div>
          </div>

          <div className="col ml-auto" style={{ backgroundColor: PrimaryTheme.background }}>
            <div className="col-md-12 content" style={{ ...styles.content, }}>
              <Switch>
                <Route exact strict path='/home'>
                  <Home />
                </Route>

                <Route exact strict path='/category'>
                  <Category />
                </Route>

                <Route exact strict path='/category/:category/:id'>
                  <Dashboard />
                </Route>

                <Route exact strict path='/jobs'>
                  <Jobs />
                </Route>

                <Route exact strict path='/jobs/details/:id'>
                  <JobDetails />
                </Route>

                <Route exact strict path='/jobs/new'>
                  <AddJob />
                </Route>

                <Route exact strict path='/my-artisans'>
                  <MyArtisans />
                </Route>

                <Route exact strict path='/artisans/details/:id'>
                  <ArtisanDetails />
                </Route>

                <Route exact strict path='/artisans/add'>
                  <AddArtisan />
                </Route>

                <Route exact strict path='/reviews'>
                  <MyReviews />
                </Route>

                <Route exact strict path='/reviews/add/:id'>
                  <AddReview />
                </Route>

                <Route exact strict path='/reviews/details/:id/:artId'>
                  <ReviewDetails />
                </Route>

                <Route exact strict path='/profile'>
                  <Profile />
                </Route>

                <Route exact strict path='/profile/edit'>
                  <EditProfile />
                </Route>

                <Route exact strict path='/notifications'>
                  <Notifications />
                </Route>

                <Route exact strict path='/notifications/:id'>
                  <NotificationDetails />
                </Route>

                <Route exact strict path='/messages/:id'>
                  <MessageDetails />
                </Route>

                <Route exact strict path='/messages'>
                  <Messages />
                </Route>

                <Route exact strict path='/networkError'>
                  <NetworkFailed />
                </Route>

                <Route exact strict path='*'>
                  <ErrorPageSecured />
                </Route>
              </Switch>
            </div>
          </div>

          <Backdrop className={classes.backdrop} open={loading}>
            <Spinner />
          </Backdrop>

        </div>
      </div>
    </div>
  )
}

const styles = {
  header: {
    color: 'dark',
  },
  searchBar: {
    height: 70,
    borderRadius: 50
  },
  sideBar: {
  },
  content: {
    marginTop: 100,
    // overflow: 'auto',
    // paddingRight: 30
  },
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    }, option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
  }),
);
