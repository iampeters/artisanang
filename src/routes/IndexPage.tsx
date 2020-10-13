import React from 'react';
import Footer from '../components/Footer';
import About from '../components/About';
import How from '../components/How';
import GetStarted from '../components/GetStarted';
import HowItWorks from '../components/HowItWorks';
import { Element } from 'react-scroll';
import Welcome from './Welcome/Welcome';


export default function IndexPage() {

  return (
    <div className='bg-white'>
      <Welcome />

      {/* <Section /> */}
      <About />

      <Element name='how-it-works'>
        <HowItWorks />
      </Element>

      <How />

      <GetStarted />


      <Footer />
    </div>
  )
}