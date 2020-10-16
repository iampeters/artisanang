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
                fontFamily: PrimaryTheme.fonts?.boldFont
              }}>About us</h2>

              <p className="text-center col-md-6 ml-auto mr-auto" style={{
                color: PrimaryTheme.white,
                textAlign: 'center',
                fontFamily: PrimaryTheme.fonts?.lightFont,
                fontSize: '1.2rem'
              }}>
                Artisana is the open platform for users of artisan services and professional artisans.
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
              fontFamily: PrimaryTheme.fonts?.lightFont,
              fontSize: '1.2rem'
            }}>
              This platform helps customers protect themselves against unprofessional and dishonest artisans. This is achieved through the registration of artisans and the opportunity to rate them based on their performance on every job by different customers. There will be no hiding place from any artisan who commits a crime, cheats a customer or does an unprofessional job based on the opinion of the customer. Artisans are not assessed based on the opinion of any single individual but on the average opinion of many customers over time. The customer cannot always be wrong.
              How does it benefit artisans? Many good artisans suffer from the general poor reputation cast on artisans in general because of the bad ones. Artisana will separate the wheat from the chaff and help us find and reward efficient and well trained artisans for the good works they do. Well rated artisans would get more jobs and earn more. Its a bright new world for all with Artisana.
              {/* Most times, consumers  of artisan services do not get maximum satisfaction from the services rendered to them.
              The issues ranges from incompetence to wanton fraudulence. The consumers of artisan services have nowhere to run to for succor. The fate of the average consumer isn't an happier one.  The justice system has not been able to remedy the situation because of the cost of litigation and unavailability of speedy trial.   At the root of the problem is the absence of certification to assist consumers discern among artisans. The country is filled with so many people parading themselves as artisans because that is their hope of earning a livelihood without consideration of the satisfaction of their consumers. There is a Shortage of  professional, well trained and reliable artisans  Being able to categorize artisans would go a long way to remedy the situation  but  the problem is how to separate the wheat from the chaff. */}
            </p>
          </div>
        </div>
      </div>

      <HowItWorks />
      <How />
      <GetStarted />
      <Footer />
    </div>
  )
}
