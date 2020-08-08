import React from 'react'
import PrimaryTheme from '../themes/Primary'
import Hero from './Hero'
import { Icon } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export default function How() {
  const history = useHistory();

  return (
    <div style={{
      backgroundColor: PrimaryTheme.white,
      height: 'auto',
    }}>
      <Hero backgroundImage={'url("/tools.jpg")'} parallax={true}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h4 className='mb-3' style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                color: PrimaryTheme.white
              }}>How it works</h4>
            </div>

            <div className="col-md-6 col-lg-3 text-white text-center mb-3">
              <Icon>star</Icon>
              <h5 className="" style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                color: PrimaryTheme.white,
                // textAlign: 'left'
              }}>
                Never contract an artisan before registering him/her on the Artisana app
              </h5>
            </div>

            <div className="col-md-6 col-lg-3 text-white text-center mb-3">
              <Icon>star</Icon>
              <Icon>star</Icon>
              <h5 className="" style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                color: PrimaryTheme.white,
                // textAlign: 'left'
              }}>
                Immediately after every job, review and document the experience on the app. This makes sure  a bad service provider is red flagged,  while the good one gets a pat in the back and recommendation
              </h5>
            </div>

            <div className="col-md-6 col-lg-3 text-white text-center mb-3">
              <Icon>star</Icon>
              <Icon>star</Icon>
              <Icon>star</Icon>
              <h5 className="" style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                color: PrimaryTheme.white,
                // textAlign: 'left'
              }}>
                Share useful information as regards artisans and their work with other users
              </h5>
            </div>

            <div className="col-md-6 col-lg-3 text-white text-center mb-3">
              <Icon>star</Icon>
              <Icon>star</Icon>
              <Icon>star</Icon>
              <Icon>star</Icon>
              <h5 className="" style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                color: PrimaryTheme.white,
                // textAlign: 'left'
              }}>
                Get tough on unscrupulous artisans by blowing the whistle on frauds and unprofessional acts on social media via Artisana -Belong to a network of users.
              </h5>
            </div>

            <div className="col-md-12 text-white text-center mb-3">
              <button className="btn btn-light" onClick={() => history.push('sign-in')}>
                <div className="row m-0 justify-content-between align-items-center">
                  <span className='mr-3'>Sign In</span>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z" />
                  </svg>
                </div>
              </button>
            </div>

          </div>
        </div>
      </Hero>

    </div>
  )
}
