import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copyright';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import PrimaryTheme from '../themes/Primary';
import { Reducers } from '../interfaces/interface';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { socialAuth, signUp } from '../redux/Actions/userActions';
import Spinner from '../components/Spinner';
import Backdrop from '@material-ui/core/Backdrop';
import firebase, { FacebookAuth, GoogleAuth } from '../firebase/FirebaseConfig';


export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [firstname, setFirstname] = React.useState('')
  const [firstnameValid, setFirstnameValid]: any = React.useState(null)
  const [lastname, setLastname] = React.useState('')
  const [lastnameValid, setLastnameValid]: any = React.useState(null)
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

  const validatePassword = (text: any) => {
    let reg = /(?=.*\d)(?=.*[a-z]*[A-Z]).{6,}/;
    // min 6 chars
    //  number required
    //   uppercase letter
    if (!reg.test(text)) {
      setPasswordValid(false);
      setPassword(text);
    } else {
      setPasswordValid(true);
      setPassword(text);
    }
  };

  const validateName = (text: any, type: any) => {
    // minimum of one character
    let reg = /^[a-zA-Z]{1,}$/;
    if (!reg.test(text)) {

      if (type === 'firstname') {
        setFirstname(text);
        setFirstnameValid(false);
      } else {
        setLastname(text);
        setLastnameValid(false);
      }
    } else {
      if (type === 'firstname') {
        setFirstname(text);
        setFirstnameValid(true);
      } else {
        setLastname(text);
        setLastnameValid(true);
      }
    }
  };

  const handleSubmit = (e: any) => {
    // open spinner
    handleToggle();
    setSubmitted(true);
    e.preventDefault();

    const user = {
      firstname,
      lastname,
      password,
      email
    }

    dispatch(signUp(user))
  };

  React.useEffect(() => {
    if (Object.entries(loginResponse).length !== 0) {
      if (!loginResponse.successful) {
        // display error message
        enqueueSnackbar(loginResponse.message, { variant: "error" });
        // stop spinner
        handleClose()

        dispatch({
          type: 'AUTHENTICATE',
          payload: {}
        });
        setSubmitted(false);
      } else {
        window.location.pathname = '/dashboard';
      }
    }
  }, [dispatch, enqueueSnackbar, loginResponse]);


  return (
    <Container component="main" maxWidth="xs" className='bg-white'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstname}
                onChange={e => validateName(e.target.value, 'firstname')}
                disabled={submitted}
                error={!firstnameValid && firstnameValid !== null}
                helperText={!firstnameValid && firstnameValid !== null && 'Only alphabets allowed.'}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastname}
                onChange={e => validateName(e.target.value, 'lastname')}
                disabled={submitted}
                error={!lastnameValid && lastnameValid !== null}
                helperText={!lastnameValid && lastnameValid !== null && 'Only alphabets allowed.'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => validateEmail(e.target.value)}
                error={!isEmailValid && isEmailValid !== null}
                helperText={!isEmailValid && isEmailValid !== null && 'Invalid email'}
                disabled={submitted}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
                helperText={!isPasswordValid && isPasswordValid !== null && 'Password must contain a minimum of 6 characters, a number and an uppercase letter'}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={e => validateConfirmPassword(e.target.value)}
                disabled={submitted}
                error={confirmPassword !== password}
                helperText={confirmPassword !== password && confirmPassword !== '' && 'Password does not match'}
              />
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="By clicking the Sign Up button, you agree to our terms and conditions."
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={
              !isEmailValid ||
              !lastnameValid ||
              !firstnameValid ||
              !isPasswordValid ||
              submitted}
            onClick={handleSubmit}
          >
            Sign Up with email
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>

          <div className='text-center pt-4 row justify-content-center align-items-center'>
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

        </form>
        {/* backdrop */}
        <Backdrop className={classes.backdrop} open={open}>
          <Spinner />
        </Backdrop>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
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