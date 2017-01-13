import React, { Component } from 'react';

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

  // const selectedPackage = {
  //   imgURL: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/140.jpg',
  //   name: 'Raining Kitten Package',
  //   description: 'The happiest rain ever'
  // };
  // const totalPrice = '$120.00';
  // const handleChange = function () {}
  // const handleSubmit = function () {}
  // const inputValue = function () {}

  return (
    <div >
      <h1>Your Cart</h1>
      <h3>Review your cart before checkout</h3>

      <div>
        <img src={selectedPackage.imgURL} />
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
      </form>

      <h3>Your Total: {totalPrice}</h3>
      <button>Purchase</button>
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
