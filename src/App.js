import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import HotelList from './components/HotelList';
import FlightList from "./components/FlightList";
import Header from "./components/Header";
import LandingPage from "./LandingPage";
import QueryPage from "./QueryPage";
import GoogleAuth from "./components/GoogleAuth";
import Timeline from "./timeline";
import { Avatar } from './components/Avatar';
import Nav from './Nav/header'

const App = () => {
  return (
    <Router>
          {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/query" element={<QueryPage />} />
        <Route path="/auth" element={<GoogleAuth />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/flights" element={<FlightList />} />
        <Route path="/avatar" element= {<Avatar/>} />
      </Routes>
    </Router>
  );
};

export default App;