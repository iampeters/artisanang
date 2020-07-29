
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import PrimaryTheme from '../themes/Primary';
import Copyright from '../components/Copyright';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/Actions/userActions';
import { Reducers } from '../interfaces/interface';

export default function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();
  const params: any = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const alert = useSelector((state: Reducers) => state.alert);

  const [password, setPassword] = React.useState('')
  const [isPasswordValid, setPasswordValid]: any = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [passwordMatch, setPasswordMatch]: any = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

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

  const comparePassword = (text: string) => {
    setConfirmPassword(text);
    if (password === text) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }

  const handleSubmit = (e: any) => {
    // open spinner
    dispatch({
      type: 'LOADING',
      payload: true
    });
    setSubmitted(true);
    e.preventDefault();

    const user = {
      password,
      confirmPassword,
      token: params.token
    }

    dispatch(resetPassword(user));
  };

  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {
        // display error message
        enqueueSnackbar(alert.message, { variant: "error" });

        if (alert.message === 'Network request failed') {
          history.push('/networkError');
        }

        dispatch({
          type: 'ALERT',
          payload: {}
        });

      } else {

        enqueueSnackbar(alert.message, { variant: "success" });

        setTimeout(() => {
          dispatch({
            type: 'ALERT',
            payload: {}
          });

          history.push('/sign-in');
        }, 500);
      }
    }
  }, [dispatch, enqueueSnackbar, alert, history]);

  return (
    <Grid container component="main" className={classes.root + ' bg-white'}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={6} lg={7} className={classes.image + '  bg-white position: relative'} >
        <div className="row h-inherit m-0 justify-content-center align-items-center d-md-inline-block d-none w-100">
          <div className="col-md-12 pt-5">
            <h1 className='display-5 mt-5' style={{ fontFamily: PrimaryTheme.fonts?.ProductSansRegular }} >Reset your password</h1>
            <h5 className="display-5" style={{ fontFamily: PrimaryTheme.fonts?.ProductSansLight }}>Your online security is our top priority...</h5>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={5} component={Paper} elevation={0} square className='border'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>

          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={e => validatePassword(e.target.value)}
              disabled={submitted}
              error={!isPasswordValid && isPasswordValid !== null}
              helperText={!isPasswordValid && isPasswordValid !== null && 'Password must contain a minimum of 6 characters, a number and an uppercase letter'}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => comparePassword(e.target.value)}
              disabled={submitted}
              error={!passwordMatch && passwordMatch !== null}
              helperText={!passwordMatch && passwordMatch !== null && 'Password does not match'}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ background: PrimaryTheme.appBar, color: PrimaryTheme.white, }}
              disabled={
                !isPasswordValid ||
                !passwordMatch ||
                submitted
              }
              onClick={handleSubmit}
            >
              Reset
            </Button>

            <Box mt={5}>
              <Copyright />
            </Box>
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
    backgroundImage: 'url(/security.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left center',
    backgroundSize: '100% auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
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