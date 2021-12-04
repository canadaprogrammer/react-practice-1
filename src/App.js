import { useState, useEffect } from 'react';

const Select = ({ coins }) => {
  return (
    <select>
      {coins.map((coin) => (
        <option value={coin.id}>
          {coin.name} ({coin.symbol}):{' '}
          {Math.round(coin.quotes.USD.price * 100) / 100} USD
        </option>
      ))}
    </select>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div className='App'>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : <Select coins={coins} />}
    </div>
  );
}

export default App;
