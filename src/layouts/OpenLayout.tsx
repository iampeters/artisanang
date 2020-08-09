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
import Unauthorized from '../routes/Unauthorized';
import { Link, Element } from 'react-scroll';
import FloatingActionButtons from '../components/Fab';
import AboutUs from '../routes/AboutUs';
import FAQs from '../routes/FAQs';


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

      <Element name='top'>
        <OpenAppBar />
      </Element>

      <div className="" style={{ backgroundColor: PrimaryTheme.background }}>

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

          <Route exact strict path='/about'>
            <AboutUs />
          </Route>

          <Route exact strict path='/faqs'>
            <FAQs />
          </Route>

          <Route exact strict path='/forgot-password'>
            <ForgotPassword />
          </Route>

          <Route exact strict path='/reset-password/:token'>
            <ResetPassword />
          </Route>

          <Route exact strict path='/unauthorized'>
            <Unauthorized />
          </Route>

          <Route exact strict path='*'>
            <ErrorPage />
          </Route>
        </Switch>

        <Backdrop className={classes.backdrop} open={loading}>
          <Spinner />
        </Backdrop>

        {/* <Link
          to='top'
          spy={true}
          smooth={true}
          duration={500}
        >
          <div className='pointer' style={{
            position: 'fixed',
            bottom: 10,
            right: 20,
            color: 'white',
            // visibility: document.body.scrollTop > 50? "visible": "hidden"
          }}>
            <FloatingActionButtons marginRight={0} IconColor={PrimaryTheme.appBar} customColor={PrimaryTheme.white} color="primary" IconName="keyboard_arrow_up" variant="round" />
          </div>
        </Link> */}
      </div>
    </div>
  )
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
