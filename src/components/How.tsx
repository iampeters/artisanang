import React from 'react'
import PrimaryTheme from '../themes/Primary'
import Hero from './Hero'
import { Icon } from '@material-ui/core'

export default function How() {
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

          </div>
        </div>
      </Hero>

    </div>
  )
}
