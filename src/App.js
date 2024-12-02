import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/nav';
import Home from './components/glowna';
import CurrencyCalculator from './components/waluty';
import CryptoCalculator from './components/krypto';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/waluty" element={<CurrencyCalculator />} />
      <Route path="/krypto" element={<CryptoCalculator />} />
    </Routes>
  </Router>
);

export default App;
