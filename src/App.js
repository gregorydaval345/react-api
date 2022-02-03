import React, { useState, useEffect} from 'react';
import { Switch } from 'antd';
import axios from 'axios';
import './App.css';
import Currency from './components/Currency';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.moonpay.com/v3/currencies'
      )
      .then(res => {
        setCoins(res.data)
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  // Filtering by name or symbol
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    || coin.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
        <div>
          <h4>Toggles:</h4>
          <Switch size='large' checkedChildren='Non US' unCheckedChildren='US' />
          <br />
          <Switch size='large' checkedChildren='Non Test Mode' unCheckedChildren='Test Mode'/>
        </div>
      </div>
      {filteredCoins.map(currency => {
        return (
          <Currency
            key={currency.id}
            type={currency.type}
            name={currency.name}
            code={currency.code}
          />
        );
      })}
    </div>
  );
}

export default App;

/*
Pull data from api:

- id
- type
- name
- code


*/
