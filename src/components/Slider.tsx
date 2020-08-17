import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import PrimaryTheme from '../themes/Primary';

export default function Slideshow() {
  return (
    <div className="slide-container mt-3">
      <Slide>
        <div className="each-slide">
          <div className='position-relative'>
            <img src="/images/engineer.jpg" alt="Artisan" className='w-100' />
            <div style={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              backgroundColor: PrimaryTheme.transparentSurface
            }}>
              <h5 style={{
                fontFamily: PrimaryTheme.fonts?.RubikMedium,
                paddingTop: 10,
                textAlign: 'center',
                marginBottom: 0,
              }}>Sign Up Easily</h5>
              <p style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                textAlign: 'center',
                padding: '0 20px',
              }}>Signing up on Artisana is free, easy and fast. Sign up with your Facebook account, G-mail or phone number.</p>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div className='position-relative'>
            <img src="/images/wood-worker.jpg" alt="Artisan" className='w-100' />
            <div style={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              backgroundColor: PrimaryTheme.transparentSurface
            }}>
              <h5 style={{
                fontFamily: PrimaryTheme.fonts?.RubikMedium,
                paddingTop: 10,
                textAlign: 'center',
                marginBottom: 0,
              }}>Add Artisans</h5>
              <p style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                textAlign: 'center',
                padding: '0 20px',
              }}>Before giving out that job, take a few seconds to add that artisan on artisana. Let’s collaborate to separate the wheat from the chaff.</p>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div className='position-relative'>
            <img src="/images/engineer-2.jpg" alt="Artisan" className='w-100' />
            <div style={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              backgroundColor: PrimaryTheme.transparentSurface
            }}>
              <h5 style={{
                fontFamily: PrimaryTheme.fonts?.RubikMedium,
                paddingTop: 10,
                textAlign: 'center',
                marginBottom: 0,
              }}>Review Artisans</h5>
              <p style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                textAlign: 'center',
                padding: '0 20px',
              }}>Get the word out by adding a simple review about their performance on Artisana. Let others know how you feel about the artisan.</p>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  )
}