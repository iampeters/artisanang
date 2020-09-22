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
import PrimaryTheme from '../themes/Primary';
import { Reducers } from '../interfaces/interface';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { artisanOnboarding } from '../redux/Actions/artisanActions';


export default function RegisterArtisan() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [firstname, setFirstname] = React.useState('')
  const [firstnameValid, setFirstnameValid]: any = React.useState(null)
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [phoneNumberValid, setPhoneNumberValid]: any = React.useState(null)
  const [lastname, setLastname] = React.useState('')
  const [lastnameValid, setLastnameValid]: any = React.useState(null)
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

  const validatePhoneNumber = (text: string) => {
    // email pattern
    let reg = /^[0-9]{11,11}$/;
    if (!reg.test(text)) {
      setPhoneNumberValid(false);
      setPhoneNumber(text.toLowerCase());
    } else {
      setPhoneNumberValid(true);
      setPhoneNumber(text);
    }
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
    dispatch({
      type: 'LOADING',
      payload: true
    });
    setSubmitted(true);
    e.preventDefault();

    const user = {
      firstname,
      lastname,
      password,
      email,
      phoneNumber,
      createdBy: 'Client',
      userType: 2
    }

    dispatch(artisanOnboarding(user))
  };

  React.useEffect(() => {
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
          history.push('/onboarding/email/sent');
        }, 3000);
      }
    }
  }, [dispatch, enqueueSnackbar, alert, history]);


  return (
    <div style={{
      backgroundColor: PrimaryTheme.white,
      backgroundImage: "url('/images/stylist.jpg')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left center',
      backgroundSize: 'cover',
      minHeight: 'calc(100vh - 64px)',
      // padding: 10,
    }}>
      <Container component="main" maxWidth="xl" style={{
        backgroundColor: PrimaryTheme.transparentSurface,
        //  paddingTop: 5,
        // paddingBottom: 10,
        padding: 0,
        minHeight: 'calc(100vh - 64px)'
      }} >
        <CssBaseline />
        <div className="row m-0" style={{
          minHeight: 'calc(100vh - 64px)',
        }}>
          <div className="col-lg-8 col-md-6 p-5 d-none d-md-block">
            <h2 style={{
              fontFamily: PrimaryTheme.fonts?.mediumFont,
              marginBottom: 5,
              marginTop: 35,
              // color: PrimaryTheme.dark,
              // textAlign: "center",
              // fontSize: PrimaryTheme.fontSizes?.small
            }}>Welcome</h2>
            <p style={{
              fontFamily: PrimaryTheme.fonts?.lightFont,
              marginBottom: 5,
              marginTop: 5,
              fontSize: '1.2rem',
              color: PrimaryTheme.black,
              // color: PrimaryTheme.dark,
              // textAlign: "center",
              // fontSize: PrimaryTheme.fontSizes?.small
            }}>
              The Artisana community welcomes you to join us to create a better, more rewarding business relationships.
              If you are a honest, hardworking and and well trained Artisan, we invite you to join our community and WATCH YOUR BUSINESS GROW
              As your rating and reviews improve based on your delivery, so does your income. Please always remember to tell your clients to rate/review you on this site.
              And it's all FREE! <br />
              Let's hear from you here
          </p>
          </div>

          <div className="col" style={{
            minHeight: "inherit",
            backgroundColor: PrimaryTheme.white,
            paddingRight: 30,
            paddingLeft: 30,
          }}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{
                fontFamily: PrimaryTheme.fonts?.boldFont,
                marginTop: 5,
                marginBottom: 5
              }}>
                Artisan sign up
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
                      // autoFocus
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
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                      value={phoneNumber}
                      onChange={e => validatePhoneNumber(e.target.value)}
                      error={!phoneNumberValid && phoneNumberValid !== null}
                      helperText={!phoneNumberValid && phoneNumberValid !== null && 'Invalid Phone Number'}
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
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="By signing up, you agree to our terms and conditions."
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
                    submitted
                  }
                  style={{ background: PrimaryTheme.black, color: PrimaryTheme.white, fontFamily: PrimaryTheme.fonts?.primaryFont }}
                  onClick={handleSubmit}
                >
                  Sign Up with email
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/sign-in" variant="body2">
                      Already an Artisan? Sign in
                    </Link>
                  </Grid>
                </Grid>


              </form>
            </div>

            <div className="col-md-12 p-2">
              <Box mt={3}>
                <Copyright color='textSecondary' />
              </Box>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
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