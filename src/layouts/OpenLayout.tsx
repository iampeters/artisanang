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
import ResetPassword from '../routes/ResetPassword';
import Backdrop from '@material-ui/core/Backdrop/Backdrop';
import Spinner from '../components/Spinner';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Reducers } from '../interfaces/interface';

export default function OpenLayout() {
  const auth = useSelector((state: any) => state.auth);
  const history = useHistory();
  const loading = useSelector((state: Reducers) => state.loading)
  const classes = useStyles();

  React.useEffect(() => {
    if (auth) {
      history.push('/dashboard');
      return;
    }
  })

  return (
    <div className='bg-white'>

      <OpenAppBar />

      <div className="container" style={{ backgroundColor: PrimaryTheme.background }}>
        <div className="row content" style={styles.content}>

          <Switch>
            <Route exact strict path='/'>
              <IndexPage />
            </Route>

            <Route exact strict path='/sign-in'>
              <SignIn />
            </Route>

            <Route exact strict path='/get-started'>
              <SignUp />
            </Route>

            <Route exact strict path='/forgot-password'>
              <ForgotPassword />
            </Route>

            <Route exact strict path='/reset-password/:token'>
              <ResetPassword />
            </Route>

            <Route exact strict path='*'>
              <ErrorPage />
            </Route>
          </Switch>

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
    color: '#fff'
  },
  section: {
    minHeight: 450,
    height: 'auto'
  },
  content: {
    // overflow: 'auto',
  }
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
