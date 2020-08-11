import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { FacebookIcon, TwitterIcon } from 'react-share'
import Copyright from './Copyright'
import Link from '@material-ui/core/Link';

export default function Footer() {
  return (
    <div
      style={{
        backgroundColor: PrimaryTheme.black,
        minHeight: 100,
        // backgroundImage: 'url(/bg.png)',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: '400px 100px',
        // backgroundPosition: 'right center',
        color: 'white',
        // padding: 10
      }}>
      <div className="container">
        <div className="row justify-content-center align-items-center pt-3">

          <div className="col-md-3 mb-3">
            <img src={'/logo.png'} alt='Logo' className='w-25' />
          </div>

          <div className="col-md-3 mb-3">
            <h6>Download Now</h6>
            <div className="col-md-12 p-0">
              <a className='mr-1' href='#'>
                <img src={'/google-play.png'} alt="Google Play store" width='45%' className='img-responsive' />
              </a>

              <a className='' href='#' >
                <img src={'/apple-store.png'} alt="Google Play store" width='45%' className='img-responsive' />

              </a>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <h6>Contact Us</h6>
            <h6>Email: <Link href={'mailto:hello@artisana.ng'} style={{ color: PrimaryTheme.white }} target='_blank'>hello@artisana.ng</Link></h6>

            <h6 className='mb-0'>Phone: <Link href={'tel:+234 705 794 7114'} style={{ color: PrimaryTheme.white }} target='_blank'>+234 705 794 7114</Link></h6>
          </div>
          <div className="col-md-3 mb-3 text-center">
            <h6>Follow us</h6>
            <a href="#">
              <FacebookIcon size={32} round className='pointer mr-2' />
            </a>
            <a href="#">
              <TwitterIcon size={32} round className='pointer mr-2' />
            </a>
            <a href="#">
              <img src="/instagram.png" alt="Instagram" className='pointer' style={{
                width: 32,
                borderRadius: 20
              }} />
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-12"
        style={{
          backgroundColor: PrimaryTheme.onSurface,
          height: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Copyright color='initial' />
      </div>
    </div>
  )
}
