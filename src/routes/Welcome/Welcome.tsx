// import React from 'react'
// import PrimaryTheme from '../themes/Primary'
// import * as Slider from 'react-animated-slider'

// export default function Welcome() {
//   return (
//     <div className='welcome' style={{
//       minHeight: 'calc(100vh - 64px)',
//       background: PrimaryTheme.dark
//     }}>
//       <div className='container-fluid'>
//         <div className="row">
//           <h5 style={{
//             color: PrimaryTheme.white
//           }}>Welcome</h5>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from "react";
// import Header from "./header";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.scss";
import "./styles.scss";
import PrimaryTheme from "../../themes/Primary";

const content = [
  {
    title: "Welcome to Artisana",
    description:
      "Join Artisana now and be part of a revolution to improve service offerings from millions of artisans to millions of users. Artisana is the brainchild of users of Artisan services like yourself to change things for the better.",
    firstButton: "Register as User",
    secondButton: "Register as Artisan",
    // image: "https://i.imgur.com/ZXBtVw7.jpg",
    image: "/images/tailor.jpg",
    user: "Luan Gjokaj",
    userProfile: "https://i.imgur.com/JSW6mEk.png"
  },
  // {
  //   title: "Are artisans ripping you off?",
  //   description:
  //     "Don't get mad, get started with Artisana. Artisana is a group consisting of users of artisan services to review and improve the quality of services rendered by artisans in Nigeria and beyond.",
  //   firstButton: "Read More",
  //   secondButton: "Read More",
  //   // image: "https://i.imgur.com/DCdBXcq.jpg",
  //   image: "/images/people.jpeg",
  //   user: "Erich Behrens",
  //   userProfile: "https://i.imgur.com/0Clfnu7.png"
  // },
  // {
  //   title: "Phasellus volutpat metus",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
  //   firstButton: "Read More",
  //   secondButton: "Read More",
  //   image: "/images/tailor.jpg",
  //   // image: "https://i.imgur.com/DvmN8Hx.jpg",
  //   user: "Bruno Vizovskyy",
  //   userProfile: "https://i.imgur.com/4KeKvtH.png"
  // }
];

export default function Welcome() {
  return (
    <div style={{
      // minHeight: 'calc(100vh - 64px)',
      // background: PrimaryTheme.dark
    }}>
      {/* <Header /> */}
      <Slider className="slider-wrapper" autoplay duration={5000}
      // previousButton={<React.Fragment>
      //   <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-arrow-right" fill="white" xmlns="http://www.w3.org/2000/svg">
      //     <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
      //   </svg>
      // </React.Fragment>}
      // nextButton={<React.Fragment>
      //   <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-arrow-left" fill="white" xmlns="http://www.w3.org/2000/svg">
      //     <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
      //   </svg>
      // </React.Fragment>}
      >
        {content.map((item, index) => (
          <div
            key={index}
            className="slider-content"
            style={{ background: `url('${item.image}') no-repeat center center` }}
          >
            <div className="inner">
              <h1 style={{
                fontFamily: PrimaryTheme.fonts?.RubikBold
              }}>{item.title}</h1>
              <p style={{
                fontFamily: PrimaryTheme.fonts?.ProductSansMedium,
                fontSize: PrimaryTheme.fontSizes?.subtitle
              }}>{item.description}</p>
              <button className='btn btn-light slider-button p-3 pl-5 pr-5 mr-2'>{item.firstButton}</button>
              <button className='btn btn-warning slider-button p-3 pl-5 pr-5'>{item.secondButton}</button>
            </div>
            {/* <section>
              <img src={item.userProfile} alt={item.user} />
              <span>
                Posted by <strong>{item.user}</strong>
              </span>
            </section> */}
          </div>
        ))}
      </Slider>
    </div >
  );
}