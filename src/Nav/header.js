import React from "react";
import './style.css'
import logo from '../assets/tbo_logo.svg';
import instagram from '../assets/insta.svg';
import twitter from '../assets/twitter.png';
import mail from '../assets/mail.svg';
import GoogleAuth from '../components/GoogleAuth';

const Nav = () => {
    return (
        <>
        <header id="header" class="fixed-top d-flex align-items-center header-transparent">
    <div class="container d-flex justify-content-between align-items-center">

      <div id="logo">
      <img src={logo} alt="Logo" width="200" height="100" />
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto" href="#team">HOME</a></li>
          <li><img src={instagram} alt="Instagram"/></li>
          <li><img src={mail} alt="Instagram"/></li>
          
          <li><GoogleAuth/></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>

  </>
    );
}

export default Nav;