import React, { useState } from 'react';

import Header from './components/Header';
import HotelList from './components/HotelList';

const Hotels = () => {
  

  return (
    <div>
        <Header>
            <HotelList></HotelList>
        </Header>
    </div>
  );
};

export default Hotels;
