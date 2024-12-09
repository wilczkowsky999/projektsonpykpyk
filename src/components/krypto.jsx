import React, { useState, useEffect } from 'react';

const CryptoCurrencyCalculator = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCrypto, setToCrypto] = useState('bitcoin');
  const [result, setResult] = useState(null);
  const [currencyRates, setCurrencyRates] = useState(null);
  const [cryptoRates, setCryptoRates] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => setCurrencyRates(data))
        .catch(err => setError('Nie udało się załadować kursów walut.')),

      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,cardano,dogecoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => setCryptoRates(data))
        .catch(err => setError('Nie udało się załadować kursów kryptowalut.'))
    ]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (amount && fromCurrency && toCrypto && currencyRates && cryptoRates) {
      if (isNaN(amount) || amount <= 0) {
        setError('Proszę wprowadzić poprawną kwotę.');
        return;
      }

      const fromRate = currencyRates.rates[fromCurrency];
      const toRate = cryptoRates[toCrypto]?.usd;

      if (fromRate && toRate) {
        const amountInUSD = amount / fromRate;
        const convertedAmount = amountInUSD / toRate;
        setResult(convertedAmount);
      } else {
        setError('Nieprawidłowa waluta lub kryptowaluta');
      }
    }
  }, [amount, fromCurrency, toCrypto, currencyRates, cryptoRates]);

  const generateBybitLink = () => {
    const fromSymbol = toCrypto.toUpperCase();
    const toSymbol = 'USDT';
    return `https://www.bybit.com/trade/${fromSymbol}-${toSymbol}`;
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setAmount(value);
      setError(null);
    } else {
      setError('Kwota nie może być ujemna.');
    }
  };

  const handleCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleCryptoChange = (e) => {
    setToCrypto(e.target.value);
  };

  const handleClear = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCrypto('bitcoin');
    setResult(null);
    setError(null);
  };

  const isButtonVisible = amount && fromCurrency && toCrypto && !loading && result !== null;

  return (
    <div className='home-container'>
      <h1>Kalkulator Kryptowalut</h1>

      <div>
        <input
          type="number"
          placeholder="Kwota"
          value={amount}
          onChange={handleAmountChange}
        />
        {/* Render currency symbol only if amount is entered */}
        {amount && <span>{fromCurrency}</span>}
      </div>

      <div>
        <select value={fromCurrency} onChange={handleCurrencyChange}>
          {currencyRates && Object.keys(currencyRates.rates).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select value={toCrypto} onChange={handleCryptoChange}>
          {cryptoRates && Object.keys(cryptoRates).map((cryptoCode) => (
            <option key={cryptoCode} value={cryptoCode}>
              {cryptoCode.charAt(0).toUpperCase() + cryptoCode.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Ładowanie kursów...</p>}

      {result !== null && (
        <p>{amount} {fromCurrency} = {result.toFixed(6)} {toCrypto.toUpperCase()}</p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isButtonVisible && (
        <div>
          <button onClick={() => window.open(generateBybitLink(), '_blank')}>
            Wymień {toCrypto.toUpperCase()} na Bybit
          </button>
        </div>
      )}

      <div>
        <button onClick={handleClear}>Wyczyść</button>
      </div>
    </div>
  );
};

export default CryptoCurrencyCalculator;
