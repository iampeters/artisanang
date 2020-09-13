import React from 'react'
import PrimaryTheme from '../themes/Primary'
import Hero from './Hero'
import { useHistory } from 'react-router-dom'

export default function HowItWorks() {
  const history = useHistory();

  return (
    <div style={{
      backgroundColor: PrimaryTheme.white,
      height: 'auto',
    }}>
      {/* backgroundImage={'url("/tools.jpg")'} */}
      <Hero parallax={false}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mb-3">
              <h3 className='' style={{
                fontFamily: PrimaryTheme.fonts?.RubikMedium,
                color: PrimaryTheme.white,
              }}>Get Started</h3>
              <p style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansLight,
                color: PrimaryTheme.light
              }}>Signing up on Artisana is free and easily accessible. Sign up, add and review artisans.</p>
            </div>
            <hr />

            <div className="col-md-6 col-lg-4 text-white text-center mb-3">
              <h4 style={{
                fontFamily: PrimaryTheme.fonts?.RubikMedium,

                color: PrimaryTheme.light,
                // textAlign: 'left'
              }}>Signup Easily</h4>

              <h5 className="" style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansLight,
                color: PrimaryTheme.light,
                // textAlign: 'left'
              }}>
                Signing up on Artisana is free, easy and fast. Sign up with your Facebook account, G-mail or phone number.
              </h5>
            </div>

            <div className="col-md-6 col-lg-4 text-white text-center mb-3">
              <h4 style={{
                fontFamily: PrimaryTheme.fonts?.RubikMedium,

                color: PrimaryTheme.light,
                // textAlign: 'left'
              }}>Add Artisans</h4>
              <h5 className="" style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansLight,
                color: PrimaryTheme.light,
                // textAlign: 'left'
              }}>
                Before giving out that job, take a few seconds to add that artisan on artisana. Let’s collaborate to separate the wheat from the chaff.
              </h5>
            </div>

            <div className="col-md-6 col-lg-4 text-white text-center mb-3">
              <h4 style={{
                fontFamily: PrimaryTheme.fonts?.RubikMedium,
                color: PrimaryTheme.light,
                // textAlign: 'left'
              }}>Review Artisans </h4>
              <h5 className="" style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansLight,
                color: PrimaryTheme.light,
                // textAlign: 'left'
              }}>
                Get the word out by adding a simple review about their performance on Artisana. Let others know how you feel about the artisan.
              </h5>
            </div>

            <div className="col-md-5 ml-auto mr-auto text-white text-center mb-3">
             <div className="row justify-content-between align-items-center">
             <button className="btn btn-light p-3 pl-5 pr-5" onClick={() => history.push('get-started')}>
                <div className="row m-0 justify-content-between align-items-center">
                  <span className='mr-3 text-uppercase'>Join as User</span>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z" />
                  </svg>
                </div>
              </button>

              <button className="btn btn-warning p-3 pl-4 pr-4" onClick={() => history.push('get-started')}>
                <div className="row m-0 justify-content-between align-items-center">
                  <span className='mr-3 text-uppercase'>Join as artisan</span>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z" />
                  </svg>
                </div>
              </button>
             </div>
            </div>

          </div>
        </div>
      </Hero>

    </div>
  )
}
