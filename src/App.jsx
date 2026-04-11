import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Universe from './pages/Universe';
import Timeline from './pages/Timeline';
import About from './pages/About';
import Sponsors from './pages/Sponsors';
import Contact from './pages/Contact';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import EventDetail from './pages/EventDetail';
import Hackathon from './pages/Hackathon';

import './index.css';

function App() {
  return (
    <Router>
      <Preloader />
      <CustomCursor />
      <Background />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/universe" element={<Universe />} />
          <Route path="/universe/:eventId" element={<EventDetail />} />
          <Route path="/hackathon" element={<Hackathon />} />

          <Route path="/about" element={<About />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
