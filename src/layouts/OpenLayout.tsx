import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import IndexPage from '../routes/IndexPage'
import { useSelector } from 'react-redux';
import OpenAppBar from '../components/AppBar';
import ErrorPage from '../routes/ErrorPage';
import SignIn from '../routes/SignIn';
import SignUp from '../routes/SignUp';
import ForgotPassword from '../routes/ForgotPassword';
import PrimaryTheme from '../themes/Primary';

export default function OpenLayout() {
  const auth = useSelector((state: any) => state.auth);
  const history = useHistory();

  React.useEffect(() => {
    if (auth) {
      history.push('/dashboard');
      return;
    }
  })

  return (
    <div>

      <OpenAppBar />

      <div className="container-fluid" style={{ backgroundColor: PrimaryTheme.background }}>
        <div className="row content" style={styles.content}>

          <Switch>
            <Route exact strict path='/'>
              <IndexPage />
            </Route>

            <Route exact strict path='/sign-in'>
              <SignIn />
            </Route>

            <Route exact strict path='/join'>
              <SignUp />
            </Route>
            <Route exact strict path='/forgot-password'>
              <ForgotPassword />
            </Route>

            <Route exact strict path='*'>
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

const styles = {
  header: {
    color: '#fff'
  },
  section: {
    height: 450
  },
  content: {
    overflow: 'auto',
  }
}
