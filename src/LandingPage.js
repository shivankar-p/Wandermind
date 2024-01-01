import React from 'react';
import { Link } from "react-router-dom";
import GoogleAuth from './components/GoogleAuth';

import './LandingPage.css';

import bgVid from './assets/bg.mp4';
import logo from './assets/tbo_logo.svg';
import instagram from './assets/insta.svg';
import twitter from './assets/twitter.png';
import mail from './assets/mail.svg';
import arrowIcon from './assets/play-512.png';



const LandingPage = () => {

const placesData = ["Milano, Italy", "Paris, France", "Dubai, UAE", "Goa, India",  "Madrid, Spain",
                    "Bali, Indonesia",  "London, UK",  "Bangkok, Thailand",  "Delhi, India",  "Miami, US",
                    "Rome, Italy",  "Istanbul, Turkey",  "Las Vegas, US",  "Shangai, China",  "Singapore",
                    "Sydney, Australia",  "Miami, US",  "Amsterdam",  "Tokyo",  "Chennai, India"];
  return (
    <div className="landing-page">
      <div className="top-area">
        <div className="logo">
          <img src={logo} alt="Logo" width="200" height="100" />
        </div>
        <div className="social-icons">
          <img src={instagram} alt="Instagram"/>
          <img src={twitter} alt="Twitter" />
          <img src={mail} alt="Mail" />
          <div style={{marginLeft: '10px'}}>
          <GoogleAuth/>
          </div>
        </div>
      </div>
      <video autoPlay muted loop id="video-bg">
        <source src={bgVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="content">
        <h1>Wandermind</h1>
        <h3>Your AI-powered travel companion</h3>
        <Link to = '/query'>
        <button className="next-button">
          <img src={arrowIcon} alt="Next" width="25" height="25"/>
        </button>
        </Link>
      </div>
      <div className="trending-places">
        <h3>Trending Places:</h3>
        <div className="places-container">
          {placesData.map((place, index) => (
            <div key={index} className="place">
              <h2>{place}</h2>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};

export default LandingPage;
