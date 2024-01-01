import React, { useState } from 'react';
import './info.css';
import pin from '../assets/pin.png';
import weather from '../assets/weather.png';
import dollar from '../assets/dollar.png';
import lang from '../assets/lang.png';

const Itineraryinfo = () => {
  const [title, setTitle] = useState('Location');
  const [desc, setDesc] = useState( 'London is a bustling metropolis with a rich history and diverse culture. Be prepared for crowded attractions and public transportation, especially during peak tourist seasons.');
  const [selectedButton, setSelectedButton] = useState('Location');


  const handleIconClick = (title, sent) => {
    setTitle(title);
    setDesc(sent);
    setSelectedButton(title);
  };

  return (
    <div className="img-container">
      <div className="bg-img">
        <h1 style={{ marginLeft: '600px' }}>Wandermind</h1>
        <h4 style={{ marginLeft: '635px' }}>AI travel planner</h4>
        <h1 style={{ marginTop: '50px', marginBottom: '50px', marginLeft: '65px', fontSize: '2.5em' }}>
          Ultimate 3-Day London Adventure with Wildlife and Scenic Delights
        </h1>
        <div className='r-box'>
            <div className="title">
              <h2>{title}</h2>
            </div>
            <div className="description">
              <h4>{desc}</h4>
            </div>
            <div className="buttons">
            <button className={`rounded-button ${selectedButton === 'Location' ? 'selected' : ''}`} onClick={() => handleIconClick('Location', 'London is a bustling metropolis with a rich history and diverse culture. Be prepared for crowded attractions and public transportation, especially during peak tourist seasons.')}>
              <img src={pin} alt="Pin icon" />
            </button>
            <button className={`rounded-button ${selectedButton === 'Weather' ? 'selected' : ''}`} onClick={() => handleIconClick('Weather', 'London has a temperate maritime climate with mild temperatures and regular rainfall throughout the year. Spring temperatures range from 45-60°F (7-15°C) with occasional rain showers.')}>
              <img src={weather} alt="Weather icon" />
            </button>
            <button className={`rounded-button ${selectedButton === 'Price' ? 'selected' : ''}`} onClick={() => handleIconClick('Price', 'The currency in London is the British Pound Sterling (GBP). The average cost of a cup of coffee is around £2.50, which is approximately $3.20 USD.')}>
              <img src={dollar} alt="Dollar icon" />
            </button>
            <button className={`rounded-button ${selectedButton === 'Language' ? 'selected' : ''}`} onClick={() => handleIconClick('Language', 'English is the dominant language spoken in London.')}>
              <img src={lang} alt="Language icon" />
            </button>
          </div>
</div>

      </div>
    </div>
  );
};

export default Itineraryinfo;