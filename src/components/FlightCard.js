// src/components/HotelCard.js
import React from 'react';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AirlinesIcon from '@mui/icons-material/Airlines';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WifiIcon from '@mui/icons-material/Wifi';

import './FlightCard.css';

const DottedLine = () => {
  const dottedLineStyle = {
    border: '1px dashed #000',
    width: '15%',
    margin: '10px 0'
    // You can customize the color and other styles as needed
  };

  return <div style={dottedLineStyle}></div>;
};


const FlightCard = ({ flight }) => {
  
  return (
    <div className="flight-card">
      <div className="flight-image">
        <img src={flight.AirlineInfo.AirlinePicture} alt={flight.AirlineInfo.AirlineName} />
      </div>
      <div className="flight-details">
        <div>
            <div style={{display: 'flex'}}>
                <AirlinesIcon style={{color: 'green', marginTop: '22px', marginRight: '10px'}}/>
                <h2>{flight.AirlineInfo.AirlineName}</h2>
            </div>
        </div>
        <p style={{marginLeft: '26%', marginTop: '-20px', marginBottom: '-25px'}}>{flight.AirlineInfo.Duration}</p>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '-20px', marginLeft: '50px' }}>
            <div>
                <h4 style={{marginBottom: '0px', marginTop: '20px'}}>{flight.AirlineInfo.FromTime}</h4>
                <h4 style={{fontWeight: 'normal', marginTop: '0px'}}>{flight.AirlineInfo.From}</h4>
            </div>
            <FiberManualRecordOutlinedIcon style={{color: 'green', marginLeft: '20px'}}/>
            <DottedLine/>
            <AirplanemodeActiveIcon style={{ transform: 'rotate(90deg)'}}/>
            <DottedLine/>
            <FiberManualRecordIcon style={{color: 'red', marginRight: '20px'}}/>
            <div>
                <h4 style={{marginBottom: '0px', marginTop: '20px'}}>{flight.AirlineInfo.ToTime}</h4>
                <h4 style={{fontWeight: 'normal', marginTop: '0px'}}>{flight.AirlineInfo.To}</h4>
            </div>
            {(flight.AirlineInfo.Meals == '1') ? 
                (
                <div style={{ textAlign: 'center', marginLeft: '5%', marginTop: '-5px' }}>
                <RestaurantIcon style={{color: 'gray'}}/>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Meals Included</p>
                </div>
                ) 
                : (<p></p>)}
            {(flight.AirlineInfo.Wifi == '1') ? 
                (
                    <div style={{ textAlign: 'center', marginLeft: '5%', marginTop: '-5px' }}>
                    <WifiIcon style={{color: 'gray'}}/>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}>Wi-fi</p>
                    </div>
                ) 
                : (<p></p>)}
            {(flight.AirlineInfo.IFE == '1') ? 
                (
                <div style={{ textAlign: 'center', marginLeft: '5%', marginTop: '-5px' }}>
                <LiveTvIcon style={{color: 'gray'}}/>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>In- Flight</p>
                <p style={{ margin: '0 0', fontSize: '14px' }}>Entertainment</p>
                </div>
                ) 
                : (<p></p>)}
            </div>
        <p style={{marginLeft: '24%', marginTop: '-25px', marginBottom: '0px'}}>{flight.AirlineInfo.Via}</p>
      </div>
      <div style={{marginTop: '35px', marginRight: '50px', fontSize: '20px' }}>
            <p><strong>{flight.MinHotelPrice.TotalPrice} $ </strong></p>
      </div>
      <div style={{marginTop: '50px', marginRight: '50px'}}>
        <button className="book-now-button">Book</button>
      </div>
    </div>
  );
};

export default FlightCard;