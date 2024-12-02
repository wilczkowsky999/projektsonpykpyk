import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Strona Główna</Link></li>
      <li><Link to="/currency-calculator">Kalkulator Walut</Link></li>
      <li><Link to="/crypto-calculator">Kalkulator Kryptowalut</Link></li>
    </ul>
  </nav>
);

export default Navbar;
