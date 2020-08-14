import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { Avatar, makeStyles, createStyles, Theme, Icon } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers } from '../interfaces/interface';
import { fileUpload } from '../redux/Actions/fileAction';
import { useSnackbar } from 'notistack';
import { updateAccount } from '../redux/Actions/userActions';

export default function EditProfile() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();


  const user = useSelector((state: Reducers) => state.user);
  const file = useSelector((state: Reducers) => state.file);
  const alert = useSelector((state: Reducers) => state.alert);

  const [imageUrl, setImageUrl]: any = React.useState(user.imageUrl);
  const [firstname, setFirstname]: any = React.useState(user.firstname);
  const [lastname, setLastname]: any = React.useState(user.lastname);
  const [state, setState]: any = React.useState(user.state);
  const [country, setCountry]: any = React.useState(user.country);
  const [phoneNumber, setPhoneNumber]: any = React.useState(user.phoneNumber);
  const [email, setEmail]: any = React.useState(user.email);
  const [submitted, setSubmitted] = React.useState(false);
  const RAND_NUM = Math.floor(Math.random() * 1234567890);

  const handleFile = (e: any) => {
    let pic = e.currentTarget.files[0];
    let fd = new FormData();
    if (pic) {
      fd.append('imageUrl', pic)
      fd.append('code', `${RAND_NUM}`)
      dispatch(fileUpload(fd))
      dispatch({
        type: 'LOADING',
        payload: true
      })

    }
  }

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    dispatch({
      type: 'TOGGLE_PROFILE_DRAWER',
      payload: false
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    dispatch({
      type: 'LOADING',
      payload: true
    })

    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
      imageUrl: imageUrl,
      _id: user._id,
      state: state,
      country: country
    };
    dispatch(updateAccount(data));
  }

  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {
        setSubmitted(false);
      } else {
        enqueueSnackbar(alert.message, { variant: "success" });

        dispatch({
          type: 'ALERT',
          payload: {}
        });

        window.location.pathname = '/profile';
      }
    }
  }, [dispatch, enqueueSnackbar, alert]);

  React.useEffect(() => {
    if (file.successful) {
      setImageUrl(file.result);
    }
  }, [file]);

  return (
    <div className='animated fadeIn profile-edit-drawer'>
      <div className="row m-0 justify-content-center align-items-center">
        <div className="col-6">
          <h6 className='display-5 mb-3 pt-3 pb-3 mt-3 text-center text-bold' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.RubikMedium }}>Profile Settings</h6>
        </div>
        <div className="col-6 text-right">
          <Icon onClick={toggleDrawer} style={{
            color: PrimaryTheme.danger,
            cursor: 'pointer'
          }}>close</Icon>
        </div>

      </div>

      <div className="col-md-12 ml-auto mr-auto p-3">

        <div className="form-group text-center">
          <label htmlFor="file" className=' pointer'>
            <Avatar
              className={classes.large + ' mb-1'}
              alt={`${user.firstname} ${user.lastname}`}
              src={imageUrl} />  <span className='text-gray-700 text-bold text-xs'>Click to change</span>
          </label>
          <input type="file" id='file' name='file' disabled={submitted} onChange={handleFile} className='d-none' />
        </div>

        <form noValidate>
          <div className="form-group mb-3">
            <label htmlFor="firstName" className='text-gray-700 text-xs text-bold'>First Name</label>
            <input
              type="text"
              name='firstName'
              id='firstName'
              className='w-100 outline-none'
              style={styles.input}
              defaultValue={firstname}
              onChange={e => setFirstname(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="lastName" className='text-gray-700 text-xs text-bold'>Last Name</label>
            <input
              type="text"
              name='lastName'
              id='lastName'
              className='w-100 outline-none'
              style={styles.input}
              defaultValue={lastname}
              onChange={e => setLastname(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email" className='text-gray-700 text-xs text-bold'>Email Address</label>
            <input
              type="email"
              name='email'
              id='email'
              className='w-100 outline-none'
              style={styles.input}
              defaultValue={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="phoneNumber" className='text-gray-700 text-xs text-bold'>Phone Number</label>
            <input
              type="tel"
              name='phoneNumber'
              id='phoneNumber'
              className='w-100 outline-none'
              style={styles.input}
              defaultValue={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="state" className='text-gray-700 text-xs text-bold'>State</label>
            <input
              type="text"
              name='state'
              id='state'
              className='w-100 outline-none'
              style={styles.input}
              defaultValue={state}
              onChange={e => setState(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="country" className='text-gray-700 text-xs text-bold'>Country</label>
            <input
              type="text"
              name='country'
              id='country'
              className='w-100 outline-none'
              style={styles.input}
              defaultValue={country}
              onChange={e => setCountry(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <button type='submit' className='btn  btn-md btn-purple border-0 w-100' style={{ ...styles.button, color: PrimaryTheme.white }} onClick={handleSubmit}>Update Profile</button>
          </div>

        </form>
      </div>
    </div >
  )
}

const styles = {
  input: {
    borderRadius: '.25rem',
    backgroundColor: '#edf2f7',
    borderColor: '#edf2f7',
    color: '#1a202c',
    lineHeight: 2,
    paddingTop: '.75rem',
    paddingBottom: '.75rem',
    paddingLeft: '.75rem',
    paddingRight: '.5rem',
    border: '1px solid #edf2f7'
  }, button: {
    borderRadius: '.25rem',
    color: '#1a202c',
    lineHeight: 2,
    paddingTop: '.75rem',
    paddingBottom: '.75rem',
    paddingLeft: '.75rem',
    paddingRight: '.5rem',
    border: '1px solid #edf2f7'
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    }, paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    }, button: {
      marginRight: theme.spacing(1),
      marginLeft: 0,
      width: theme.spacing(6),
      height: theme.spacing(6),
    }, fab: {
      bottom: 0,
      right: 20,
    }, card: {
      backgroundImage: 'url(/bg.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'right center',
      color: 'white',
    }
  }),
);

