import React from 'react';
import { Link } from 'react-router';

// import ProductsRow from './ProductsRow'; TODO: maybe bases are displayed in a products row

export const SelectedProduct = ({ selectedPackage /*TODO: BASE*/, createOrder }) => ( 
  <div>
    <h1>Your selected product is: {selectedPackage.name}</h1>
    <h2>Description: {selectedPackage.description}</h2>
    <img 
      src={selectedPackage.imageURL} 
    />
    <h3>Price: ${selectedPackage.base.basePrice}</h3>
    <Link to='/cart' onClick={() => createOrder(selectedPackage)}>
      <button type='button'><h3>Continue to cart</h3></button>
    </Link>
  </div>
)

import {createOrder} from 'APP/app/reducers/orders'
import {connect} from 'react-redux'

export default connect (
  (state, ownProps) => ({ selectedPackage: state.products.selectedPackage }),{createOrder},
) (SelectedProduct)