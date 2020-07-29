import React from 'react'
import { useDispatch } from 'react-redux'
import PrimaryTheme from '../themes/Primary';
import { Icon, Button } from '@material-ui/core';

export default function Settings() {
  const dispatch = useDispatch();

  const handleSignOut = () => {

    dispatch({
      type: 'LOADING',
      payload: true
    })

    dispatch({
      type: "USER",
      payload: {}
    })
    dispatch({
      type: "AUTH_TOKEN",
      payload: {}
    })

    sessionStorage.removeItem('auth');
    localStorage.clear();

    window.location.pathname = '/sign-in'

  }

  return (
    <div className='animated fadeIn'>
      <div className='col-md-12'>
        <div className="row m-0 justify-content-between">
          <h4 className='mb-0' style={{ color: PrimaryTheme.appBar }}>Settings</h4>
          <Button style={{ color: PrimaryTheme.white, background: PrimaryTheme.danger }} variant='outlined' size='small' className='btn btn-danger btn-sm bg-danger' onClick={handleSignOut}>
            <Icon style={{ color: PrimaryTheme.white, marginRight: 5 }}>exit_to_app</Icon>
            Logout
          </Button>
        </div>
      </div>

      <div className="col-md-9 col-lg-7 ml-auto mr-auto p-0 mb-5">

      </div>
    </div>
  )
}
