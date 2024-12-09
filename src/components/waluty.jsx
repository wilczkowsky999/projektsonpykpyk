import React, { useState, useEffect } from 'react';

const CurrencyCalculator = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PLN');
  const [result, setResult] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        setExchangeRates(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Nie udało się załadować kursów walut.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (amount && exchangeRates && fromCurrency && toCurrency) {
      const fromRate = exchangeRates.rates[fromCurrency];
      const toRate = exchangeRates.rates[toCurrency];

      if (fromRate && toRate) {
        const convertedAmount = (amount / fromRate) * toRate;
        setResult(convertedAmount);
      } else {
        setError('Nieprawidłowa wybrana waluta');
      }
    } else {
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const currencyNames = {
    USD: "US Dollar",
    PLN: "Polish Zloty",
    EUR: "Euro",
    GBP: "British Pound",
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
      setError(null);
    } else {
      setError('Kwota musi być liczbą większą lub równą 0.');
    }
  };

  const handleClear = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCurrency('PLN');
    setResult(null);
    setError(null);
  };

  const roundExchangeRate = (rate) => {
    if (rate) {
      return rate.toFixed(4).replace(/(\.0+|(\.[1-9]*[1-9]))$/, '$1');
    }
    return 'N/A';
  };

  const isButtonVisible = amount && fromCurrency && toCurrency && !loading;

  return (
    <div className='home-container'>
      <h1>Kalkulator Walut</h1>

      <div>
        <input
          type="number"
          placeholder="Kwota"
          value={amount}
          onChange={handleAmountChange}
          disabled={loading}
        />
        {amount && (
          <span>{fromCurrency} ({currencyNames[fromCurrency] || fromCurrency})</span>
        )}
      </div>

      <div>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          disabled={loading}
        >
          {exchangeRates && Object.keys(exchangeRates.rates).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode} ({currencyNames[currencyCode] || currencyCode})
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          disabled={loading}
        >
          {exchangeRates && Object.keys(exchangeRates.rates).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode} ({currencyNames[currencyCode] || currencyCode})
            </option>
          ))}
        </select>
      </div>

      {result !== null && !loading && (
        <p>Możesz kupić: {result.toFixed(2)} {toCurrency}</p>
      )}

      {exchangeRates && fromCurrency && toCurrency && (
        <p>
          Kurs {fromCurrency} do {toCurrency}:
          {roundExchangeRate(exchangeRates.rates[toCurrency] / exchangeRates.rates[fromCurrency])}
        </p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading && <p>Ładowanie danych...</p>}

      {isButtonVisible && (
        <div>
          <button
            onClick={() => window.open(`https://www.xe.com/currencyconverter/convert/?From=${fromCurrency}&To=${toCurrency}`, '_blank')}
            disabled={loading || error}
          >
            Wymiana na {toCurrency}
          </button>
        </div>
      )}

      <div>
        <button
          onClick={handleClear}
          disabled={loading}
        >
          Wyczyść
        </button>
      </div>
    </div>
  );
};

export default CurrencyCalculator;
