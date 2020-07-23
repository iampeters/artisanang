import React from 'react'
import { useDispatch } from 'react-redux'

export default function Settings() {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    sessionStorage.removeItem('auth');

    dispatch({
      type: "USER",
      payload: {}
    })
    dispatch({
      type: "AUTH_TOKEN",
      payload: {}
    })

    window.location.pathname = '/sign-in'

  }

  return (
    <div>
      Settings

      <button className='btn btn-danger' onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}
