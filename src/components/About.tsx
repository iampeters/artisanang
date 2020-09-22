import React from 'react'
import PrimaryTheme from '../themes/Primary';

export default function About() {
  return (
    <div style={{
      backgroundColor: PrimaryTheme.light,
      height: 'auto',
      padding: '50px 0'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3">
            <h4 className='' style={{
              fontFamily: PrimaryTheme.fonts?.mediumFont
            }}>About Artisana</h4>

            <h5 className="text-secondary" style={{
              fontFamily: PrimaryTheme.fonts?.lightFont,
              lineHeight: 1.5
            }}>
              Artisana is a group consisting of users of artisan services to review and improve the quality of services rendered by artisans in Nigeria and beyond.
            </h5>

            <button className="btn btn-dark p-3 pl-5 pr-5" onClick={() => window.location.pathname = 'about'}>
              <div className="row m-0 justify-content-between align-items-center">
                <span className='mr-3 text-uppercase'>Learn more</span>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z" />
                </svg>
              </div>
            </button>
          </div>

          <div className="col-md-6 mb-3">
            <img src="/images/mechanic.jpg" alt="Artisan" className='w-100' />
          </div>
        </div>
      </div>
    </div>
  )
}
