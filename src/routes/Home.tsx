import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { Icon } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const history = useHistory();

  return (
    <div style={{
      minHeight: `calc(100vh - 130px)`,
      backgroundImage: 'url("/images/user-2.jpg")',
      backgroundColor: PrimaryTheme.white,
      backgroundPosition: 'top left',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden'
    }} className='animated fadeIn'>
      <div className="row m-0 h-inherit mt-5">

        <div className="col-lg-4 d-none d-lg-inline p-0">
        </div>

        <div className="col-md-6 col-lg-4 " style={{ background: PrimaryTheme.transparent }}>
          <div className="row m-0">
            <div className="col-md-12 p-0">
              <div className="p-4" style={{
                backgroundImage: 'url(/bg.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                backgroundColor: PrimaryTheme.purple,
                fontFamily: PrimaryTheme.fonts?.RubikBold,
                textAlign: 'center',
                color: 'white',
                borderRadius: '10px 10px 0 0'
              }}>
                <h4>Add Artisan</h4>
              </div>
            </div>
            <div className="col-md-12 pt-4" style={{
              backgroundColor: PrimaryTheme.transparentSurface,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5
            }}>
              <h5 className='display-5 animated fadeInDown' style={{
                fontFamily: PrimaryTheme.fonts?.RubikRegular,
                color: PrimaryTheme.black
              }}>Before giving out that job, take a few seconds to add that artisan on Artisana</h5>

              <h5 className='display-5 animated fadeIn slow mt-3' style={{
                fontFamily: PrimaryTheme.fonts?.RubikRegular,
                color: PrimaryTheme.black,
                // backgroundColor: PrimaryTheme.white,
              }}>Let’s collaborate to separate the wheat from the chaff.</h5>

              <div className="form-group mt-5 animated fadeInUp text-center">
                <button className='btn badge-pill btn-lg pl-5 pr-3'
                  style={{
                    backgroundColor: PrimaryTheme.purple,
                    color: PrimaryTheme.white
                  }}
                  onClick={() => history.push('/artisans/add')}
                >
                  <div className="row m-0 justify-content-around align-items-center">
                    <span style={{
                      fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                      marginRight: 10,
                    }}>Get Started</span>
                    <Icon className='animated fadeInLeft infinite'>arrow_right_alt</Icon>
                  </div>
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="col-md-6 col-lg-4" style={{ background: PrimaryTheme.transparent }}>
          <div className="row m-0">
            <div className="col-md-12 p-0">
              <div className="p-4" style={{
                backgroundImage: 'url(/bg.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                backgroundColor: PrimaryTheme.appBar,
                color: 'white',
                fontFamily: PrimaryTheme.fonts?.RubikBold,
                textAlign: 'center',
                borderRadius: '10px 10px 0 0'

              }}>
                <h4>Premium</h4>
              </div>
            </div>
            <div className="col-md-12 pt-3" style={{
              backgroundColor: PrimaryTheme.transparentSurface,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5
            }}>
              <h2 className='display-5 animated fadeInDown' style={{
                fontFamily: PrimaryTheme.fonts?.RubikBold,
                color: PrimaryTheme.appBar
              }}>Become a</h2>
              <h3 className='display-5 animated fadeIn slow'
                style={{
                  fontFamily: PrimaryTheme.fonts?.LemonadaMedium,
                  color: PrimaryTheme.black
                }}><b>Premium User</b></h3>
              <h2 className='display-5 animated fadeIn slow'
                style={{
                  fontFamily: PrimaryTheme.fonts?.RubikBold,
                  color: PrimaryTheme.appBar,
                  // backgroundColor: PrimaryTheme.white,
                }}
              >for free now</h2>
              <h5 className='display-5 animated fadeIn slow mt-3' style={{
                fontFamily: PrimaryTheme.fonts?.RubikRegular,
                color: PrimaryTheme.black,
                // backgroundColor: PrimaryTheme.white,
              }}>Register up to 15 artisans and enjoy <b>₦50,000</b> worth of work tools.</h5>
              {/* <h5 className='display-5 animated fadeIn slow' style={{
                fontFamily: PrimaryTheme.fonts?.RubikRegular,
                color: PrimaryTheme.black,
                // backgroundColor: PrimaryTheme.white,
              }}></h5> */}

              <div className="form-group mt-4 animated fadeInUp text-center">
                <button className='btn badge-pill btn-color btn-lg pl-5 pr-3'
                  style={{
                    // backgroundColor: PrimaryTheme.warn
                  }}
                  onClick={() => history.push('/artisans/add')}
                >
                  <div className="row m-0 justify-content-around align-items-center">
                    <span style={{
                      fontFamily: PrimaryTheme.fonts?.ProductSansBold,
                      marginRight: 10,
                    }}>Get started</span>
                    <Icon className='animated fadeInLeft infinite'>arrow_right_alt</Icon>
                  </div>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
