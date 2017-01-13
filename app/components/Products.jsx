import React from 'react';
import ProductsRow from './ProductsRow';

export const Products = ({ products, pickProduct }) => ( 
  <div>
    <h1>Your Weather, Your Way</h1>
    <ProductsRow 
      products={products.packages} 
      pickProduct={pickProduct}
    />    
    <ProductsRow 
      products={products.packages} 
      pickProduct={pickProduct}
    />    
    <ProductsRow 
      products={products.bases} 
      pickProduct={pickProduct}
    />    
  </div>
)

import {pickProduct} from 'APP/app/reducers/products'
import {connect} from 'react-redux'

export default connect (
  (state, ownProps) => ({ products: state.products }),{pickProduct},
) (Products)