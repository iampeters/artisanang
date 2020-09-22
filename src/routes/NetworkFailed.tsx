import React from 'react'
import PrimaryTheme from '../themes/Primary'

export default function NetworkFailed() {
  return (
    <div className='col-md-8 ml-auto mr-auto' style={{
      minHeight: 'calc(100vh - 64px)'
    }}>
      <div className="row justify-content-center align-items-center h-inherit">
        <div className="form-group bg-white p-5 border-radius-20" style={{
          minWidth: 400,
          width: 'auto',
          textAlign: 'center'
        }}>
          <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-hdd-network-fill" fill={PrimaryTheme.variant} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h5.5v3A1.5 1.5 0 0 0 6 11.5H.5a.5.5 0 0 0 0 1H6A1.5 1.5 0 0 0 7.5 14h1a1.5 1.5 0 0 0 1.5-1.5h5.5a.5.5 0 0 0 0-1H10A1.5 1.5 0 0 0 8.5 10V7H14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
          </svg>
          <h4 style={{
             marginTop: 20,
             color: PrimaryTheme.primary,
             fontFamily: PrimaryTheme.fonts?.mediumFont
          }}>Connection broken</h4>
          <p style={{
             marginBottom: 20,
             color: PrimaryTheme.dark,
             fontFamily: PrimaryTheme.fonts?.mediumFont
          }}>Make sure your have internet connection.</p>

        </div>
      </div>
    </div>
  )
}
