import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Copyright from '../components/Copyright';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import PrimaryTheme from '../themes/Primary';
import { Reducers } from '../interfaces/interface';
import { useSelector, useDispatch } from 'react-redux';
import { login, socialAuth } from '../redux/Actions/userActions';
import Spinner from '../components/Spinner';
import Backdrop from '@material-ui/core/Backdrop';
import firebase, { FacebookAuth, GoogleAuth } from '../firebase/FirebaseConfig';

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const loginResponse = useSelector((state: Reducers) => state.login);
  const [isEmailValid, setEmailValid]: any = React.useState(null);
  const [isPasswordValid, setPasswordValid]: any = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const validateEmail = (text: string) => {
    // email pattern
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(text)) {
      setEmailValid(false);
      setEmail(text.toLowerCase());
    } else {
      setEmailValid(true);
      setEmail(text);
    }
  };

  const validatePassword = (text: string) => {
    if (text.length >= 1) {
      setPassword(text);
      setPasswordValid(true);
    } else {
      setPassword(text);
      setPasswordValid(false);
    }
  }

  const handleGoogleAuth = () => {
    // open spinner
    handleToggle();
    firebase.auth().signInWithPopup(GoogleAuth)
      .then(function (result: any) {
        const name = result.user.displayName.split(' ');
        const user = {
          firstname: name[0],
          lastname: name[1],
          email: result.user.email,
          phoneNumber: result.user.phoneNumber,
          imageUrl: result.user.photoURL
        }

        dispatch(socialAuth(user));

      }).catch(function (error) {
        // close spinner
        handleClose();
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        console.log(errorCode, errorMessage, email, credential)
      });
  };

  const handleFacebookAuth = () => {
    // open spinner
    handleToggle();
    firebase.auth().signInWithPopup(FacebookAuth)
      .then(function (result: any) {
        const name = result.user.displayName.split(' ');
        const user = {
          firstname: name[0],
          lastname: name[1],
          email: result.user.email,
          phoneNumber: result.user.phoneNumber,
          imageUrl: result.user.photoURL
        }

        dispatch(socialAuth(user));

      }).catch(function (error) {
        // close spinner
        handleClose();
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        console.log(errorCode, errorMessage, email, credential)
      });
  };

  const handleSubmit = (e: any) => {
    // open spinner
    handleToggle();

    e.preventDefault();

    let user = {
      email: email,
      password: password,
    };
    dispatch(login(user));
    setSubmitted(true);

    dispatch({
      type: 'LOADING',
      payload: true
    });
  };

  useEffect(() => {
    if (Object.entries(loginResponse).length !== 0) {
      if (!loginResponse.successful) {
        // display error message
        enqueueSnackbar(loginResponse.message, { variant: "error" });
        // stop spinner
        handleClose();

        dispatch({
          type: 'AUTHENTICATE',
          payload: {}
        });

        setSubmitted(false);
      } else {
        // stop spinner
        handleClose();

        window.location.pathname = '/artisans';
      }
    }
  }, [dispatch, enqueueSnackbar, loginResponse]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => validateEmail(e.target.value)}
              error={!isEmailValid && isEmailValid !== null}
              helperText={!isEmailValid && isEmailValid !== null && 'Invalid email'}
              disabled={submitted}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => validatePassword(e.target.value)}
              disabled={submitted}
              error={!isPasswordValid && isPasswordValid !== null}
              helperText={!isPasswordValid && isPasswordValid !== null && 'Password field is required'}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={!isEmailValid || !isPasswordValid || submitted}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs className='mb-1'>
                <Link href='forgot-password' variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item className='mb-1'>
                <Link href='join' variant="body2">
                  {"Don't have an account? Create account"}
                </Link>
              </Grid>
            </Grid>
            <div className='text-center pt-2 row justify-content-center align-items-center'>
              <hr className='w-25' />
              <h6>Or use social account</h6>
              <hr className='w-25' />
            </div>

            <div className="row">
              <div className="col-md-6">
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  className={classes.button + ' col mt-2'}
                  onClick={handleGoogleAuth}
                  style={{ background: PrimaryTheme.google, color: PrimaryTheme.white }}
                > <FontAwesomeIcon icon={faGoogle} className='mr-2' /> Google
                </Button>
              </div>

              <div className="col-md-6">
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button + ' col mt-2'}
                  onClick={handleFacebookAuth}
                  style={{ background: PrimaryTheme.facebook, color: PrimaryTheme.white }}
                >
                  <FontAwesomeIcon icon={faFacebook} className='mr-2' />
                  Facebook</Button>
              </div>
            </div>

            <Box mt={5}>
              <Copyright />
            </Box>

            {/* backdrop */}
            <Backdrop className={classes.backdrop} open={open}>
              <Spinner />
            </Backdrop>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }, button: {
    margin: theme.spacing(0),
  }, backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));