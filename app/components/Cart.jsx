import React, { Component } from 'react';
import {Link} from 'react-router';
import DatePicker from 'react-datepicker';


//pubrequire('react-datepicker/dist/react-datepicker.css');

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
    <div className="text-center">
      <h1>Your Cart</h1>
      <h3>Review your cart before checkout</h3>

      <h3><u>Your Selected Package</u></h3>

      <div className="row">
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img src={selectedPackage.imageURL} />
            <div className="caption">
              <h3>{selectedPackage.name}</h3>
              <p>{selectedPackage.description}</p>
            </div>
          </div>
        </div>
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
              <DatePicker
                dateFormat="MM/DD/YYYY"
                placeholderText="Click to select a date"
                todayButton={"Today"}
                selected={startDateInputValue}
                onChange={handleDateChange}
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
