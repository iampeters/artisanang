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

export default function SecuredLayout() {
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
          <div className="col-3 bg-light" style={{ ...styles.sideBar, display: menuToggle }}>
            <div className="col-md-12 sideBar p-3 bg-white">
              <Nav />
            </div>
          </div>

          <div className="col ml-auto bg-light p-0">
            <div className="col-md-12 content" style={{ ...styles.content, }}>
              <Switch>
                <Route exact strict path='/dashboard'>
                  <Dashboard />
                </Route>

                <Route exact strict path='/my-jobs'>
                  <Jobs />
                </Route>

                <Route exact strict path='/my-artisans'>
                  <MyArtisans />
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

                <Route exact strict path='/artisans/:id'>
                  <ArtisanDetails />
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
  sideBar: {},
  content: {
    marginTop: 30,
    overflow: 'auto',
    paddingRight: 30
  }
}
