import React, { useState } from 'react';

const CryptoCalculator = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    setResult(amount / rate);
  };

  return (
    <div>
      <h1>Kalkulator Kryptowalut</h1>
      <input 
        type="number" 
        placeholder="Kwota w walucie fiat" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Kurs kryptowaluty (np. BTC/USD)" 
        value={rate} 
        onChange={(e) => setRate(e.target.value)} 
      />
      <button onClick={calculate}>Przelicz</button>
      {result && <p>Możesz kupić: {result} jednostek kryptowaluty</p>}
    </div>
  );
};

export default CryptoCalculator;
