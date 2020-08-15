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
              fontFamily: PrimaryTheme.fonts?.RubikMedium,
            }}>Available in stores</h3>
            <p className='text-center'>
              Download Artisana app now and tell your friends about it
            </p>

            <div className="col-md-4 ml-auto mr-auto p-0">
              <a className='mr-1' href='https://artisana.ng' target='_blank' rel="noopener noreferrer">
                <img src={'/google-play.png'} alt="Google Play store" width='45%' className='img-responsive' />
              </a>

              <a className='' href='https://artisana.ng' target='_blank' rel="noopener noreferrer">
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
