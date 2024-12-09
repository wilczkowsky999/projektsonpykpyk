import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/nav';
import Home from './components/glowna';
import CurrencyCalculator from './components/waluty';
import CryptoCalculator from './components/krypto';
import './components/style.css';
import './components/style1.css';

const App = () => {
  return (
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/waluty" element={<CurrencyCalculator />} />
      <Route path="/krypto" element={<CryptoCalculator />} />
    </Routes>
    <footer style={{ marginTop: '20px', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
        <p>&copy; 2024 kcpr999. Wszystkie prawa zastrzeżone.</p>
        <p className="info">
        Prosimy nie nadużywać resetowania kursów, ponieważ strona korzysta z API, które przyjmuje określoną liczbę zapytań.
      </p>
    </footer>
</BrowserRouter>
    )

};

export default App;
