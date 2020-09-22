
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import PrimaryTheme from '../themes/Primary';
import Copyright from '../components/Copyright';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../redux/Actions/userActions';
import { Reducers } from '../interfaces/interface';
import { useSnackbar } from 'notistack';

export default function ForgotPassword() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const alert = useSelector((state: Reducers) => state.alert);

  const [email, setEmail]: any = React.useState('');
  const [isEmailValid, setEmailValid]: any = React.useState(null);
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

  const handleNavigation = (route: string) => {
    history.push(route)
  }

  const handleSubmit = (e: any) => {
    // open spinner
    dispatch({
      type: 'LOADING',
      payload: true
    })
    setSubmitted(true);
    e.preventDefault();

    dispatch(forgotPassword({ email }));
  };

  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {
        // display error message
        enqueueSnackbar(alert.message, { variant: "error" });

        setSubmitted(false);
      } else {
        enqueueSnackbar(alert.message, { variant: "success" });
        setSubmitted(false);
      }
    }
  }, [dispatch, enqueueSnackbar, alert]);

  return (
    <div className="bg-white">
      <div className="container">
        <div className="row">
          <Grid container component="main" className={classes.root + ' bg-white'}>
            <CssBaseline />
            <Grid item xs={false} sm={false} md={6} lg={7} className={classes.image + '  bg-white position: relative'} >
              <div className="row h-inherit m-0 justify-content-center align-items-center d-md-inline-block d-none w-100" style={{
                backgroundColor: 'rgba(255,255,255, .65)',
                paddingBottom: 50,
                height: '100vh'
              }}>
                <div className="col-md-12 pt-5">
                  <h1 className='display-5 mt-5' style={{ fontFamily: PrimaryTheme.fonts?.primaryFont }} >Forgot your password?</h1>
                  <h5 className="display-5" style={{ fontFamily: PrimaryTheme.fonts?.lightFont }}>Don't worry we got your back...</h5>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5} component={Paper} elevation={0} square className='border'>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Forgot password?
          </Typography>

                <form className={classes.form} noValidate>
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

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    style={{ background: PrimaryTheme.appBar, color: PrimaryTheme.white, }}
                    disabled={
                      !isEmailValid ||
                      submitted
                    }
                    onClick={handleSubmit}
                  >
                    Remind me
            </Button>

                  <Grid container>
                    <Grid item>
                      <Link href="sign-in" onClick={() => handleNavigation("sign-in")} variant="body2">
                        {"Remembered password? Sign In"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright color='textSecondary' />
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid >
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
    backgroundImage: 'url("/images/tailor.jpg")',
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