import React, { useEffect, useState } from 'react';

const Home = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [cryptoRates, setCryptoRates] = useState(null);
  const [loadingCurrency, setLoadingCurrency] = useState(true);
  const [loadingCrypto, setLoadingCrypto] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date()); 
  const [fetchTime, setFetchTime] = useState(null); 

  const fetchData = () => {
    setLoadingCurrency(true);
    setLoadingCrypto(true);
    setExchangeRates(null);
    setCryptoRates(null);
    setError(null);

    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        setExchangeRates(data);
        setLoadingCurrency(false);
        setFetchTime(new Date());
      })
      .catch(err => {
        console.error('Error fetching exchange rates:', err);
        setError('Nie udało się załadować kursów walut');
        setLoadingCurrency(false);
      });

    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,litecoin,dogecoin&vs_currencies=usd')
      .then(response => response.json())
      .then(data => {
        setCryptoRates(data);
        setLoadingCrypto(false);
        setFetchTime(new Date());
      })
      .catch(err => {
        console.error('Error fetching crypto rates:', err);
        setError('Nie udało się załadować kursów kryptowalut');
        setLoadingCrypto(false);
      });
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  return (
    <div className="home-container">
      <h1>Aktualne Kursy Walut i Kryptowalut</h1>

      <div className="clock">
        <h2>Bieżący Czas</h2>
        <p>{formatDateTime(currentTime)}</p>
      </div>

      {loadingCurrency && <p className="loading">Ładowanie kursów walut...</p>}
      {loadingCrypto && <p className="loading">Ładowanie kursów kryptowalut...</p>}
      
      {error && <p className="error">{error}</p>}

      {!loadingCurrency && !loadingCrypto && !error && (
        <div className="rates-container">
          {exchangeRates && (
            <div className="currency-rates">
              <h2>Kursy Walut</h2>
              <p>USD to EUR: {exchangeRates.rates.EUR.toFixed(2)}</p>
              <p>USD to PLN: {exchangeRates.rates.PLN.toFixed(2)}</p>
              <p>USD to GBP: {exchangeRates.rates.GBP.toFixed(2)}</p>
              <p>USD to JPY: {exchangeRates.rates.JPY.toFixed(2)}</p>
              <p>USD to CHF: {exchangeRates.rates.CHF.toFixed(2)}</p>
            </div>
          )}

          {cryptoRates && (
            <div className="crypto-rates">
              <h2>Kursy Kryptowalut</h2>
              <p>Bitcoin (BTC): ${cryptoRates.bitcoin.usd.toFixed(2)}</p>
              <p>Ethereum (ETH): ${cryptoRates.ethereum.usd.toFixed(2)}</p>
              <p>Cardano (ADA): ${cryptoRates.cardano.usd.toFixed(2)}</p>
              <p>Litecoin (LTC): ${cryptoRates.litecoin.usd.toFixed(2)}</p>
              <p>Dogecoin (DOGE): ${cryptoRates.dogecoin.usd.toFixed(2)}</p>
            </div>
          )}
        </div>
      )}

      {fetchTime && !loadingCurrency && !loadingCrypto && (
        <div className="fetch-time">
          <h2>Czas pobrania kursów</h2>
          <p>Ostatnia aktualizacja: {formatDateTime(fetchTime)}</p>
        </div>
      )}

      <button onClick={fetchData} className="reset-button">
        Pobierz Najnowsze Kursy
      </button>

    </div>
  );
};

export default Home;
