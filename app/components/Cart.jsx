import React, { Component } from 'react';

export default class Cart extends Component {
  componentDidMount() {
    
  }

  
  render() {
  
    return (
      <div >
        <h1>Product description</h1>
        
      </div>
    )
  }
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