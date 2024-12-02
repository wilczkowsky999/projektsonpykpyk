import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <div className='ok'>

      <Link className="nav-link" to="/">Strona Główna</Link>
      <Link className="nav-link" to="/waluty">Kalkulator Walut</Link>
      <Link className="nav-link" to="/krypto">Kalkulator Kryptowalut</Link>
    </div>
    </nav>
);

export default Navbar;
