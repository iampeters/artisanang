import React from 'react'
import SecuredAppBar from '../components/Header'
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import { Switch, Route, useHistory } from 'react-router-dom';
import Dashboard from '../routes/Dashboard';
import Jobs from '../routes/Jobs';
import MyArtisans from '../routes/MyArtisans';
import MyReviews from '../routes/MyReviews';
import Profile from '../routes/Profile';
import Settings from '../routes/Settings';
import ArtisanDetails from '../routes/ArtisanDetails';
import ErrorPage from '../routes/ErrorPage';
import Notifications from '../routes/Notifications';
import NotificationDetails from '../routes/NotificationDetails';
import MessageDetails from '../routes/MessageDetails';
import Messages from '../routes/Messages';
import AddArtisan from '../routes/AddArtisan';
import PrimaryTheme from '../themes/Primary';
import { Backdrop, makeStyles, Theme, createStyles } from '@material-ui/core';
import Spinner from '../components/Spinner';
import { Reducers } from '../interfaces/interface';

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
          <div className="col-3" style={{ display: menuToggle, position: 'relative', }}>
            <div className="col-md-3 sideBar p-0 bg-white">
              <Nav />
            </div>
          </div>

          <div className="col ml-auto p-0" style={{ backgroundColor: PrimaryTheme.background }}>
            <div className="col-md-12 content" style={{ ...styles.content, }}>
              <Switch>
                <Route exact strict path='/artisans'>
                  <Dashboard />
                </Route>

                <Route exact strict path='/my-jobs'>
                  <Jobs />
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

                <Route exact strict path='/my-reviews'>
                  <MyReviews />
                </Route>

                <Route exact strict path='/profile'>
                  <Profile />
                </Route>

                <Route exact strict path='/settings'>
                  <Settings />
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

                <Route exact strict path='*'>
                  <ErrorPage />
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
    paddingRight: 30
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
