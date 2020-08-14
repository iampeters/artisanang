import React from 'react'
import PrimaryTheme from '../themes/Primary'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import GetStarted from '../components/GetStarted'
import Footer from '../components/Footer'
import How from '../components/How'

export default function AboutUs() {

  React.useEffect(() => {
    
  })
  return (
    <div style={{
      backgroundColor: PrimaryTheme.white,
      height: 'auto',
    }}>
      <Hero backgroundImage={'url("/tools.jpg")'} parallax={true}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 style={{
                color: PrimaryTheme.white,
                textAlign: 'center',
                fontFamily: PrimaryTheme.fonts?.RubikBold
              }}>About us</h2>

              <p className="text-center col-md-6 ml-auto mr-auto" style={{
                color: PrimaryTheme.white,
                textAlign: 'center',
                fontFamily: PrimaryTheme.fonts?.ProductSansLight,
                fontSize: '1.2rem'
              }}>
                Artisana is a group consisting of users of artisan services to review and improve the quality of services rendered by artisans in Nigeria and beyond.
               </p>

            </div>
          </div>
        </div>
      </Hero>

      <div className="container">
        <div className="row">
          <div className="col-md-12 p-5">
            <p className="text-center" style={{
              color: PrimaryTheme.black,
              textAlign: 'center',
              fontFamily: PrimaryTheme.fonts?.ProductSansLight,
              fontSize: '1.2rem'
            }}>
              Most times, consumers  of artisan services do not get maximum satisfaction from the services rendered to them.
              The issues ranges from incompetence to wanton fraudulence. The consumers of artisan services have nowhere to run to for succor. The fate of the average consumer isn't an happier one.  The justice system has not been able to remedy the situation because of the cost of litigation and unavailability of speedy trial.   At the root of the problem is the absence of certification to assist consumers discern among artisans. The country is filled with so many people parading themselves as artisans because that is their hope of earning a livelihood without consideration of the satisfaction of their consumers. There is a Shortage of  professional, well trained and reliable artisans  Being able to categorize artisans would go a long way to remedy the situation  but  the problem is how to separate the wheat from the chaff.
               </p>
          </div>
        </div>
      </div>

      <HowItWorks />
      <How/>
      <GetStarted />
      <Footer />
    </div>
  )
}
