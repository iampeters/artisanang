import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { Icon } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const history = useHistory();

  return (
    <div style={{
      background: PrimaryTheme.background,
      minHeight: `calc(100vh - 130px)`,
      backgroundImage: 'url("/user-2.jpg")',
      backgroundColor: PrimaryTheme.background,
      // backgroundPosition: 'top right',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden'
    }} className='animated fadeIn'>
      <div className="row m-0 h-inherit">
        <div className="col-md-6 p-5" style={{ background: PrimaryTheme.transparent }}>
          <h1 className='display-4 mt-5 animated fadeInDown' style={{
            fontFamily: PrimaryTheme.fonts?.ProductSansBold,
            color: PrimaryTheme.appBar
          }}>Become a</h1>
          <h2 className='display-4 animated fadeIn slow'
            style={{
              fontFamily: PrimaryTheme.fonts?.LemonadaMedium,
              color: PrimaryTheme.black
            }}><b>Premium User</b></h2>
          <h2 className='display-4 animated fadeIn slow'
            style={{
              fontFamily: PrimaryTheme.fonts?.ProductSansBold,
              color: PrimaryTheme.appBar,
              // backgroundColor: PrimaryTheme.white,
            }}
          >for <span className=''>free</span> now</h2>
          <h4 className='display-5 animated fadeIn slow' style={{
            fontFamily: PrimaryTheme.fonts?.ProductSansBold,
            color: PrimaryTheme.black,
            // backgroundColor: PrimaryTheme.white,
          }}>Register up to 15 artisans and enjoy</h4>
          <h4 className='display-5 animated fadeIn slow' style={{
            fontFamily: PrimaryTheme.fonts?.ProductSansBold,
            color: PrimaryTheme.black,
            // backgroundColor: PrimaryTheme.white,
          }}><b>₦50,000</b> worth of work tools.</h4>

          <div className="form-group mt-4 animated fadeInUp">
            <button className='btn badge-pill btn-warning btn-lg w-50'
              style={{
                backgroundColor: PrimaryTheme.warn
              }}
              onClick={() => history.push('/artisans/add')}
            >
              <div className="row m-0 justify-content-around align-items-center">
                <span  style={{
                  fontFamily: PrimaryTheme.fonts?.ProductSansBold
                }}>Get started</span>
                <Icon className='animated fadeInLeft infinite'>arrow_right_alt</Icon>
              </div>
            </button>
          </div>

        </div>
        <div className="col-md-6" style={{
          // background: 'url("/hero-desktop.jpg")',
          // backgroundPosition: 'top center',
          // backgroundSize: 'contain',
          // backgroundRepeat: 'no-repeat'
        }}>
          {/* // TODO - add slider */}
        </div>
      </div>
    </div>
  )
}
