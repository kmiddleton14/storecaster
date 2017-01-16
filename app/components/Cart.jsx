import React, { Component } from 'react';
import {Link} from 'react-router';

export default function (props) {
  //TODO: Implement loop to create all products from passed in orders



  const selectedPackage = props.selectedPackage;
  const totalPrice = props.calculatePrice;
  const handleSubmit = props.handleSubmit;

  const handleNameChange = props.handleNameChange;
  const handleCityChange = props.handleCityChange;
  const handleDateChange = props.handleDateChange;

  const nameInputValue = props.nameInputValue;
  const cityInputValue = props.cityInputValue;
  const startDateInputValue = props.startDateInputValue;

  return (
    <div >
      <h1>Your Cart</h1>
      <h3>Review your cart before checkout</h3>

      <div>
        <img src={selectedPackage.imageURL} />
        <h3>{selectedPackage.name}</h3>
        <h4>Package Description: {selectedPackage.description}</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Enter Your Shipping Information</legend>
          <div>
            <label>Name</label>
            <div>
              <input
                type="text"
                onChange={handleNameChange}
                value={nameInputValue}
              />
            </div>
          </div>
          <div>
            <label>Ship To City:</label>
            <div>
              <input
                type="text"
                onChange={handleCityChange}
                value={cityInputValue}
              />
            </div>
          </div>
          <div>
            <label>Weather Start Date:</label>
            <div>
              <input
                type="text"
                onChange={handleDateChange}
                value={startDateInputValue}
              />
            </div>
          </div>
        </fieldset>
        <h3>Your Total: {totalPrice}</h3>
        <button type="submit">Purchase</button>
      </form>

    </div>
  )
}


/*
Cart props required
  - selected package
    - current order
    - cities []
    - calculatePrice()
    - name
    - city
    - date
    - updateOrder('completed', ship_city_id, date_scheduled)
    - total price
Cart Form - local state:
    - name input
    - city  input
    - date input
*/
