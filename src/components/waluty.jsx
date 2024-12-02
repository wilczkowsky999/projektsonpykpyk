import React, { useState } from 'react';

const CurrencyCalculator = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    setResult(amount * rate);
  };

  return (
    <div>
      <h1>Kalkulator Walut</h1>
      <input 
        type="number" 
        placeholder="Kwota" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Kurs wymiany" 
        value={rate} 
        onChange={(e) => setRate(e.target.value)} 
      />
      <button onClick={calculate}>Przelicz</button>
      {result && <p>Wynik: {result}</p>}
    </div>
  );
};

export default CurrencyCalculator;
