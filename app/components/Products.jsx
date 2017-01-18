import React from 'react';
import ProductsRow from './ProductsRow';

export const Products = ({ products, pickProduct }) => ( 
  <div>
    <h1>Your Weather, Your Way</h1>
    <h4>Select Your Starting Package</h4>
    <ProductsRow 
      products={products.packages} 
      pickProduct={pickProduct}
    />     
  </div>
)

import {pickProduct} from 'APP/app/reducers/products'
import {connect} from 'react-redux'

export default connect (
  (state, ownProps) => ({ products: state.products }),{pickProduct},
) (Products)
