import React, { useState } from 'react';

import Header from './components/Header';
import FlightList from './components/FlightList';

const Flights = () => {
  

  return (
    <div>
        <Header>
            <FlightList></FlightList>
        </Header>
    </div>
  );
};

export default Flights;
