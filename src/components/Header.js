// Header.js
import React from 'react';
import leftLogo from '../assets/tbo_logo.svg'; // Import your left logo
import rightLogo from '../assets/voyagehacks.svg'; // Import your right logo

const Header = () => {
  return (
    <header style={{ background: 'orange', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <img src={leftLogo} alt="Left Logo" style={{ marginLeft: '20px', width: '200px', height: '100px' }} />
      </div>
      <div>
        <img src={rightLogo} alt="Right Logo" style={{ width: '200px', height: '100px', marginRight: '20px' }} />
      </div>
    </header>
  );
};

export default Header;
