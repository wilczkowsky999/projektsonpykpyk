import React, { useEffect, useState } from 'react';

const Home = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [cryptoRates, setCryptoRates] = useState(null);

  useEffect(() => {

    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => setExchangeRates(data));

    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
      .then(response => response.json())
      .then(data => setCryptoRates(data));
  }, []);

  return (
    <div>
      <h1>Aktualne Kursy</h1>
      {exchangeRates && (
        <div>
          <h2>Kursy Walut</h2>
          <p>USD to EUR: {exchangeRates.rates.EUR}</p>
          <p>USD to PLN: {exchangeRates.rates.PLN}</p>
        </div>
      )}
      {cryptoRates && (
        <div>
          <h2>Kursy Kryptowalut</h2>
          <p>Bitcoin (BTC): ${cryptoRates.bitcoin.usd}</p>
          <p>Ethereum (ETH): ${cryptoRates.ethereum.usd}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
