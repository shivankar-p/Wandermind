import React from "react";
import './style.css'
import {addDest} from '../options'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Hero = () => {

    const navigate = useNavigate();

    const handleEnter = () => {
        navigate("/query");
    }

    const placesData = ["Milano, Italy", "Paris, France", "Dubai, UAE", "Goa, India",  "Madrid, Spain",
                    "Bali, Indonesia",  "London, UK",  "Bangkok, Thailand",  "Delhi, India",  "Miami, US",
                    "Rome, Italy",  "Istanbul, Turkey",  "Las Vegas, US",  "Shangai, China",  "Singapore",
                    "Sydney, Australia",  "Miami, US",  "Amsterdam",  "Tokyo",  "Chennai, India"];

    return (
        <>
        <section id="hero">
        <div class="hero-container" data-aos="zoom-in" data-aos-delay="100">
      <h1>Welcome to Wandermind</h1>
      <h2>AI powered iterative travel planner</h2>
      <div className="form mb-3">
                  <i class="fa fa-search"></i>
                  <input type="text" class="form-control form-input" placeholder="Search any city or upload a photo" onKeyDown={(event) => {
                    if (event.key == 'Enter'){
                        addDest(event.target.value);
                        handleEnter();
                    }
                    else if (event.key == 'Shift'){
                        const response = axios.post('http://127.0.0.1:5000/upload', {url: event.target.value}, {
      headers: {
        'Content-Type': 'application/json',
      }})
    .then((response) => {
      console.log(response);

      const locality = response.data['locality'];
                        addDest(locality);
                        handleEnter();
                    })
                  }
                  
                  }}/>
                  <span class="left-pan"><i class="fa fa-microphone"></i></span>
                </div>
    </div>
    <h3>Trending Places:</h3>
        <div className="places-container">
          {placesData.map((place, index) => (
            <div key={index} className="place">
              <h2>{place}</h2>
            </div>
          ))}
        </div>
  </section>
  


  </>
    );
}

export default Hero;