import React, { useState, useEffect} from 'react';
import { Switch } from 'antd';
import axios from 'axios';
import './App.css';
import { Tab, Table } from 'semantic-ui-react';
import _, { filter, set } from 'lodash'
import Currency from './components/Currency';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  // Toggles:
  const [usEnabled, setUsEnabled] = useState(false);
  const [testModeEnabled, setTestModeEnabled] = useState(false);

  // Button Sort Logic - 'name':
  const [sortEnabled, setSort] = useState();

  // Button Sort Logic - 'code':
  const [codeSortEnabled, codeSetSort] = useState();


  function fetchCoin() {
    return axios
    .get(
      'https://api.moonpay.com/v3/currencies'
    )
    .then(res => {
      let filterData = res.data;
      if (usEnabled) {
        console.log(usEnabled);
        filterData = filterData.filter(coin => coin.isSupportedInUS)
      }
      if (testModeEnabled) {
        filterData = filterData.filter(coin => coin.supportsTestMode)
      }
      if (sortEnabled) {
        filterData = filterData.sort((a, b) => {
          let keyA = a.name;
          let keyB = b.name;
          if(keyA != keyB){
            return keyA.localeCompare(keyB);
          }
        });
      }
      if (codeSortEnabled) {
        filterData = filterData.sort((a, b) => {
          let keyA = a.code;
          let keyB = b.code;
          if(keyA != keyB){
            return keyA.localeCompare(keyB);
          }
        });
      }
      setCoins(filterData)
      console.log(res.data);
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchCoin()
  }, [usEnabled, testModeEnabled, sortEnabled, codeSortEnabled]); //re-run// re-fetch

  const handleChange = e => {
    setSearch(e.target.value);
  };

  // Filtering by name or symbol/code
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    || coin.code.toLowerCase().includes(search.toLowerCase())
  );


   function OnUsClickEvent(checked, event) {
     setUsEnabled(checked)
     //fetchCoin()
  }

  console.log({usEnabled, testModeEnabled})

  function OnTestModeClickEvent(checked, event) {
    setTestModeEnabled(checked)
    //fetchCoin()
  }

  //Button Sort functions: by name
  function onSortButtonByName() {
    setSort(!sortEnabled)
  }

  // Button Sorty function: by code
  function onSortButtonByCode() {
    codeSetSort(!codeSortEnabled)
  }
  


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
          <Switch onClick={OnUsClickEvent} size='large' checkedChildren='Non US' unCheckedChildren='US'/>
          <br />
          <Switch onClick={OnTestModeClickEvent} size='large' checkedChildren='Non Test Mode' unCheckedChildren='Test Mode'/>
        </div>
        <button onClick={onSortButtonByName} >Sort By Name</button>
        <button onClick={onSortButtonByCode}>Sort By Code</button>
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
