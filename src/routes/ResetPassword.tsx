
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://artisana.ng/" target="_blank" rel='noopener noreferer'>
        Artisana NG
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();

  const handleNavigation = (route: string) => {
    history.push(route)
  }

  return (
    <Grid container component="main" className={classes.root + ' bg-white'}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={6} lg={7} className={classes.image + '  bg-white position: relative'} >
        <div className="row h-inherit m-0 justify-content-center align-items-center d-md-inline-block d-none w-100">
          <div className="col-md-12 pt-5">
            <h1 className='display-5 mt-5' style={{ fontFamily: PrimaryTheme.fonts?.ProductSansRegular }} >Reset your password?</h1>
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

          <form className={classes.form} noValidate>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ background: PrimaryTheme.appBar, color: PrimaryTheme.white, }}
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