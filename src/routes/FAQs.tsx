import React from 'react'
import PrimaryTheme from '../themes/Primary'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import GetStarted from '../components/GetStarted'
import Footer from '../components/Footer'
import How from '../components/How'
import SimpleAccordion from '../components/Accordion'

export default function FAQs() {

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
                fontFamily: PrimaryTheme.fonts?.ProductSansRegular
              }}>Frequently Asked Questions</h2>

            </div>
          </div>
        </div>
      </Hero>

      <div className="container">
        <div className="row">
          <div className="col-md-12 p-5">
            <SimpleAccordion title="Why was Artisana established?" body="The group Artisana is the brainchild of a growing group of Nigerian consumers of Artisan services who feel the pains of constant poor and dishonest services provided by unscrupulous artisans. In Nigeria, cheated customers have no protection from the law or government regulations. Unfortunately, many artisans do not belong to a professional or licensing body powerful enough to address the co cares of patrons. The bad image thus acquired by these bad artisans ultimately runs off on the honest and hardworking ones with a negative effect on their reputation. We the stakeholders, after several mind rubbing, agree to form this group to help consumers identify good and bad artisans based on their past records with us. The more people join us to use our platforms, the more artisans we can rate and review. Join us now!" />

            <SimpleAccordion title="What do I do if I am very satisfied/dissatisfied with the quality of work provided by an 
            artisan/small business on Artisana?" body="To be a part of this group and be able to participate in this great assignment, you must register as a user on the Artisana app and register EVERY ARTISAN BEFORE YOU CONTACT THEM. This helps us know every single artisan being used by our members. You must also return to do your rating and review. This ensures that the good or bad record of that artisan is recorded for other users to see. These bad artisans get penalized and good artisans get rewarded." />

            <SimpleAccordion title="Does Artisana provide a listing for Artisans in Nigeria? " body="Not at the beginning. Artisana is going to be a big family of users. Gradually we will build a huge list of rated and reviewed artisans. This will take some time but don’t all good things take time? Eventually we will all benefit to freely pick reliable and honest artisans based on their records with our members. In this way we all work together to kick the crooked artisans out of business." />
            <SimpleAccordion title="What happens after I register on the Artisana app?" body="By registering, you are able to document,  rate and review artisans. You are also able to view other artisans. Membership of our group which is attained by registering and downloading our app also means you get to interact with other artisan users so that, if both parties consent, you can actually share information on artisans and their work. You will also thereby have access to delightful promotional offers on high quality certified goods and services from other members as members are free to advertise their goods and services." />
            <SimpleAccordion title="Can I register myself as an Artisan?" body="No, Artisans cannot register themselves as artisans. But they can register as users and then register other artisans they engage to work for them." />
            <SimpleAccordion title="How do I know if an Artisan review is accurate?" body="Members of this network are periodically reviewed. Comments are checked for accuracy and when there is a complaint our investigative team will swing into action to verify stories. We invite anyone dissatisfied with any rated or review to contact our helpline on 07057947114(Text and WhatsApp only)" />
            <SimpleAccordion title="Can people outside Lagos state register?" body="People can register from any part of the world although focus for now is Nigeria." />
            <SimpleAccordion title="Is registration on the Artisana app free?" body="All services on the Artisan platform FREE. While minor charges may in future apply to certain services, registration and use of the app itself will be permanently FREE." />
            <SimpleAccordion title="Can I refer an Artisan?" body='This must be based on "user “experience' />
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
