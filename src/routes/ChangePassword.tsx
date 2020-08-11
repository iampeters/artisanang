import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { useSelector, useDispatch } from 'react-redux';
import { Reducers } from '../interfaces/interface';
import { useSnackbar } from 'notistack';
import { changePassword } from '../redux/Actions/userActions';
import { Icon } from '@material-ui/core';

export default function ChangePassword() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();

  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);

  const [oldPassword, setOldPassword]: any = React.useState('');
  const [password, setPassword]: any = React.useState('');
  const [passwordValid, setPasswordValid]: any = React.useState(null);
  const [passwordMatch, setPasswordMatch]: any = React.useState(null);
  const [confirmPassword, setConfirmPassword]: any = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const toggleChangePasswordDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch({
      type: 'TOGGLE_PASSWORD_DRAWER',
      payload: false
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

  const comparePassword = (text: string) => {
    setConfirmPassword(text);
    if (password === text) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    dispatch({
      type: 'LOADING',
      payload: true
    })

    const data = {
      oldPassword,
      newPassword: password,
      confirmPassword,
      userId: user._id,
    };
    dispatch(changePassword(data));
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

  return (
    <div className='animated fadeIn profile-edit-drawer'>
      <div className="row m-0 justify-content-center align-items-center">
        <div className="col-6">
          <h6 className='display-5 mb-3 pt-3 pb-3 mt-3 text-center text-bold' style={{ color: PrimaryTheme.appBar }}>Change Password</h6>
        </div>
        <div className="col-6 text-right">
          <Icon onClick={toggleChangePasswordDrawer} style={{
            color: PrimaryTheme.danger,
            cursor: 'pointer'
          }}>close</Icon>
        </div>

      </div>

      <div className="col-md-12 ml-auto mr-auto p-3">

        <form noValidate>
          <div className="form-group mb-3">
            <label htmlFor="oldPassword" className='text-gray-700 text-xs text-bold'>Current Password</label>
            <input
              type="password"
              name='oldPassword'
              id='oldPassword'
              className='w-100 outline-none'
              style={styles.input}
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              disabled={submitted}
            />
          </div>

          <div className="form-group mb-3 position-relative">
            <label htmlFor="password" className='text-gray-700 text-xs text-bold'>New Password</label>
            <input
              type="password"
              name='password'
              id='password'
              className='w-100 outline-none'
              style={styles.input}
              value={password}
              onChange={e => validatePassword(e.target.value)}
              disabled={submitted}
            />
            <span style={{ ...styles.hint, position: 'absolute', }}>
              {!passwordValid && passwordValid !== null && <Icon className='text-danger small animated fadeIn'>close</Icon>}
              {passwordValid && passwordValid !== null && <Icon className='text-success small animated fadeIn'>done</Icon>}
            </span>
            {!passwordValid && passwordValid !== null && <span className='text-danger small animated fadeIn'>Password must contain a minimum of 6 characters, a number and an uppercase letter</span>}
          </div>

          <div className="form-group mb-3 position-relative">
            <label htmlFor="confirmPassword" className='text-gray-700 text-xs text-bold'>Confirm Password</label>
            <input
              type="password"
              name='confirmPassword'
              id='confirmPassword'
              className='w-100 outline-none'
              style={styles.input}
              value={confirmPassword}
              onChange={e => comparePassword(e.target.value)}
              disabled={submitted}
            />
            <span style={{ ...styles.hint, position: 'absolute', }}>
              {!passwordMatch && passwordMatch !== null && <Icon className='text-danger small animated fadeIn'>close</Icon>}
              {passwordMatch && passwordMatch !== null && <Icon className='text-success small animated fadeIn'>done</Icon>}
            </span>
            {!passwordMatch && passwordMatch !== null && <span className='text-danger small animated fadeIn'>Password does not match</span>}
          </div>

          <div className="form-group mb-3">
            <button type='submit' className='btn  btn-md btn-purple border-0 w-100' style={{ ...styles.button, color: PrimaryTheme.white }} onClick={handleSubmit}>Update Password</button>
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
  }, hint: {
    top: 45,
    right: '20px'
  }
}


