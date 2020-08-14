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
import firebase, { FacebookAuth, GoogleAuth } from '../firebase/FirebaseConfig';

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const alert = useSelector((state: Reducers) => state.alert);
  const [isEmailValid, setEmailValid]: any = React.useState(null);
  const [isPasswordValid, setPasswordValid]: any = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  const validateEmail = (text: string) => {
    // email pattern
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
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
    dispatch({
      type: 'LOADING',
      payload: true
    });
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
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        console.log(errorCode, errorMessage, email, credential);

        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });

        dispatch({
          type: 'LOADING',
          payload: false
        });
      });
  };

  const handleFacebookAuth = () => {
    // open spinner
    dispatch({
      type: 'LOADING',
      payload: true
    });
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

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        console.log(errorCode, errorMessage, email, credential);
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });

        dispatch({
          type: 'LOADING',
          payload: false
        });
      });
  };

  const handleSubmit = (e: any) => {
    // open spinner
    dispatch({
      type: 'LOADING',
      payload: true
    });

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
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {
        // display error message
        enqueueSnackbar(alert.message, { variant: "error" });
        dispatch({
          type: 'ALERT',
          payload: {}
        });

        dispatch({
          type: 'LOADING',
          payload: false
        })

        setSubmitted(false);
      } else {
        setTimeout(() => {
          dispatch({
            type: 'LOADING',
            payload: false
          })
          window.location.pathname = '/home';
        }, 1000);
      }
    }
  }, [dispatch, enqueueSnackbar, alert]);

  return (
    <div className="bg-white">
      <div className="container">
        <div className="row">
          <Grid container component="main" className={classes.root + ' bg-white'} >
            <CssBaseline />
            <Grid item xs={false} sm={false} md={6} lg={7} className={classes.image + ' bg-white position: relative'} >
              <div className="row h-inherit m-0 justify-content-center align-items-center d-md-inline-block d-none w-100 " style={{
                backgroundColor: 'rgba(255,255,255, .65)',
                paddingBottom: 50,
                height: '100vh'
              }}>
                <div className="col-md-12 pt-5">
                  <h1 className='display-5 mt-5' style={{ fontFamily: PrimaryTheme.fonts?.RubikBold }} >Welcome back!</h1>
                  <h5 className="display-5 mb-3" style={{ fontFamily: PrimaryTheme.fonts?.ProductSansRegular }}>Sign in to your account to continue... </h5>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5} component={Paper} elevation={0} square className='border'>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{
                  fontFamily: PrimaryTheme.fonts?.RubikBold
                }}>
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
                    // autoFocus
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
                    className={classes.submit}
                    onClick={handleSubmit}
                    disabled={!isEmailValid || !isPasswordValid || submitted}
                    style={{ background: PrimaryTheme.primary, color: PrimaryTheme.white, fontFamily: PrimaryTheme.fonts?.ProductSansRegular }}
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
                      <Link href='get-started' variant="body2">
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
                        style={{ background: PrimaryTheme.facebook, color: PrimaryTheme.white, }}
                      >
                        <FontAwesomeIcon icon={faFacebook} className='mr-2' />
                  Facebook</Button>
                    </div>
                  </div>

                  <Box mt={5}>
                    <Copyright color='textSecondary' />
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url("/images/user.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',

  },
  paper: {
    margin: theme.spacing(8, 4),
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