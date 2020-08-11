import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function Slideshow() {
  return (
    <div className="slide-container mt-3">
      <Slide>
        <div className="each-slide">
          <div>
            <img src="/Woodwork.jpg" alt="Artisan" className='w-100' />
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src="/Woodwork.jpg" alt="Artisan" className='w-100' />
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div >
          <img src="/Woodwork.jpg" alt="Artisan" className='w-100' />
            <span>Slide 3</span>
          </div>
        </div>
      </Slide>
    </div>
  )
}