import React from 'react'
import PrimaryTheme from '../themes/Primary'

export default function GetStarted() {
  return (
    <div style={{
      backgroundColor: PrimaryTheme.white,
      height: 'auto',
      padding: '50px 0'
    }}>
      {/* <Hero backgroundImage={'url("/tools.jpg")'} parallax={false}> */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className='text-center' style={{
              // color: PrimaryTheme.white
            }}>Available in stores</h3>
            <p className='text-center'>
              Download Artisana app now and tell your friends about it
            </p>

            <div className="col-md-4 ml-auto mr-auto p-0">
              <a className='mr-1' href='#'>
                <img src={'/google-play.png'} alt="Google Play store" width='45%' className='img-responsive' />
              </a>

              <a className='' href='#' >
                <img src={'/apple-store.png'} alt="Google Play store" width='45%' className='img-responsive' />

              </a>
            </div>
          </div>
        </div>
      </div>
      {/* </Hero> */}
    </div>
  )
}
