import React from 'react';
import PrimaryTheme from '../themes/Primary';
import { useHistory } from 'react-router-dom';
import Typed from 'react-typed';
import { Link } from 'react-scroll';
import Slideshow from '../components/Slider';


export default function Section() {
  const history = useHistory();


  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 hero" style={{ backgroundColor: PrimaryTheme.white }}>
            <div className="row justify-content-center align-items-center h-inherit">

              <div className="col-md-6 pt-4">
                <div className="" style={styles.section}>
                  <h1 className='display-3 mb-1 animated fadeIn' style={{
                    fontFamily: PrimaryTheme.fonts?.RubikBold,
                  }}>Are artisans</h1>
                  <h2 className='display-5 mb-3 animated flipInX' style={{
                    fontFamily: PrimaryTheme.fonts?.RubikRegular,
                  }}>
                    <Typed
                      strings={['ripping you off?', 'We are here to help...']}
                      typeSpeed={60}
                      backSpeed={50}
                      loop
                    /></h2>
                  <h5 className='display-5 mb-1 animated fadeIn' style={{ fontFamily: PrimaryTheme.fonts?.RubikMedium }}>Don't get mad, get started with Artisana</h5>
                  <p className="animated fadeIn" style={{ fontFamily: PrimaryTheme.fonts?.ProductSansRegular }}>Artisana is a group consisting of users of artisan services to review and improve the quality of services rendered by artisans in Nigeria and beyond. </p>

                  <div className="col-md-12 mt-5">
                    <div className="row justify-content-start mb-3">
                      <div className="col-md-12 col-lg-6 mb-3">
                        <button className='btn btn-appBar border-radius btn-lg w-100' style={{
                          fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                        }} onClick={() => history.push('get-started')} >
                          <div className="row m-0 justify-content-center align-items-center">
                            <span className='mr-3'> Get Started</span>

                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z" />
                            </svg>

                          </div>
                        </button>
                      </div>

                      <div className="col-md-12 col-lg-6 mb-3">
                        <Link
                          to="how-it-works"
                          spy={true}
                          smooth={true}
                          duration={500}
                        >
                          <button className='btn btn-light border-radius btn-lg w-100' style={{
                            fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                            color: PrimaryTheme.active
                          }} >
                            <div className="row m-0 justify-content-center align-items-center">

                              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-info-circle-fill mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                              </svg>
                              <span className='mr-3'> How it works</span>
                            </div>
                          </button>
                        </Link>

                      </div>
                    </div>

                    <div className="row justify-content-start">
                      <div className="col-md-12 col-lg-6 mb-3">
                        <button className='btn btn-white border-radius p-0' style={{
                          fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                        }} >
                          <img src={'/google-play.png'} alt="Google Play store" width='60%' className='img-responsive' />

                        </button>
                      </div>

                      <div className="col-md-12 col-lg-6 mb-3">
                        <button className='btn btn-white border-radius p-0' style={{
                          fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                        }} >
                          <img src={'/apple-store.png'} alt="Google Play store" width='60%' className='img-responsive' />

                        </button>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
              <div className="col-md-6 hero-image">
                <div className="position-relative" style={styles.section}>
                  <Slideshow />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


const styles = {
  header: {
    color: '#fff'
  },
  section: {
    minHeight: 450,
    height: 'auto',
  }
}