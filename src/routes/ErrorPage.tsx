import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { Icon } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export default function ErrorPage() {
  const history = useHistory();
  return (
    <div style={{
      background: PrimaryTheme.background,
      // backgroundImage: 'url("/hero-desktop.jpg")',
      // backgroundPosition: 'top center',
      // backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat',
    }} className='animated fadeIn bg-white'>
      <div className="container" style={{
        minHeight: `calc(100vh - 64px)`,
      }}>
        <div className="row h-inherit justify-content-center align-items-center">
          <div className="col-md-12 text-center">
            <h2 className='text-dark display-2'>Oops! 404</h2>
            <h4 className='text-dark display-5'>Page Not Found</h4>
            <p className=''>The page you are looking for could not be found on this server.</p>
            <button className="btn btn-purple badge-pill btn-md pl-4 pr-4" onClick={() => history.goBack()}>
              <div className="row m-0 justify-content-center align-items-center">
                <Icon>keyboard_backspace</Icon>
                <span className='ml-3'>Go back</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
