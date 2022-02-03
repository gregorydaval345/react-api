import React from 'react';
import '../components/Currency.css'


 const Currency = ({
     type, 
     name,
     code
 }) => {
  return (
      <div className='coin-container'>
          <div className='coin-row'>
              <div className='coin'>
                  {/* <img src={image} alt='crypto'></img> */}
                  <h1>{name}</h1>
              </div>
              <div className='coin-data'>
                  <p className='coin-price'>{type}</p>
                  <p className='coin-volume'>{code}</p>
              </div>
          </div>
      </div>
  )
}

export default Currency
