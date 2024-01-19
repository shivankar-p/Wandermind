import React, { useState } from 'react';
import './info.css';
import pin from '../assets/pin.png';
import weather from '../assets/weather.png';
import dollar from '../assets/dollar.png';
import lang from '../assets/lang.png';

const Itineraryinfo = () => {
  const [title, setTitle] = useState('LOCATION');
  const [desc, setDesc] = useState( 'Hawaii offers a tranquil tropical escape with breathtaking scenery and a relaxed island vibe.  Be prepared for a relaxed pace of life amid the captivating allure of this Pacific paradise.');
  const [selectedButton, setSelectedButton] = useState('Location');


  const handleIconClick = (title, sent) => {
    setTitle(title);
    setDesc(sent);
    setSelectedButton(title);
  };

  return (
    <div className="img-container">
      <div className="bg-img">
        <div className="overlay">
        <h1 style={{ marginLeft: '585px'}}>WANDERMIND</h1>
        <h4 style={{ marginLeft: '635px' }}>AI travel planner</h4>
        <h1 style={{ marginTop: '50px', marginBottom: '50px', marginLeft: '130px', fontSize: '2em' }}>
        3-Day Hawaiian Paradise: Basking in Nature's Beauty and Coastal Adventures
        </h1>
        <div className='r-box'>
            <div className="title">
              <h2>{title}</h2>
            </div>
            <div className="description">
              <h4>{desc}</h4>
            </div>
            <div className="buttons">
            <button className={`rounded-button ${selectedButton === 'Location' ? 'selected' : ''}`} onClick={() => handleIconClick('LOCATION','Hawaii offers a tranquil tropical escape with breathtaking scenery and a relaxed island vibe.  Be prepared for a relaxed pace of life amid the captivating allure of this Pacific paradise.')}>
              <img src={pin} alt="Pin icon" />
            </button>
            <button className={`rounded-button ${selectedButton === 'Weather' ? 'selected' : ''}`} onClick={() => handleIconClick('WEATHER', 'Hawaii enjoys a year-round tropical climate with warm temperatures ranging from 70-85°F (21-29°C) in spring, featuring consistent rainfall and occasional refreshing showers.')}>
              <img src={weather} alt="Weather icon" />
            </button>
            <button className={`rounded-button ${selectedButton === 'Price' ? 'selected' : ''}`} onClick={() => handleIconClick('PRICE', 'The currency in Hawaii is the United States Dollar (USD). The average cost of a cup of coffee is around $4.00 USD, providing a taste of the island flavors with a scenic backdrop.')}>
              <img src={dollar} alt="Dollar icon" />
            </button>
            <button className={`rounded-button ${selectedButton === 'Language' ? 'selected' : ''}`} onClick={() => handleIconClick('LANGUAGE', 'English is the dominant language spoken in Hawaii.')}>
              <img src={lang} alt="Language icon" />
            </button>
          </div>
          </div>
        </div>
    </div>
      </div>
  );
};

export default Itineraryinfo;