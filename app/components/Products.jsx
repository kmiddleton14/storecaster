import React from 'react';
import ProductsRow from './ProductsRow';

export const Products = ({ products, pickProduct }) => (
  <div>
    <h1 className='text-center'>Your Weather, Your Way</h1>
    <h2 className='text-center'>Select Your Starting Package</h2>
    <ProductsRow
      products={products.packages}
      pickProduct={pickProduct}
    />
    <h2 className='text-center'>Or, create a custom starting with one of the following bases:</h2>
    <h3 className='text-center'>Rainy</h3>
    <ProductsRow
    	products={products.bases.filter(b => b.category === 'Rainy')}
    	pickProduct={pickProduct}
    />
    <h3 className='text-center'>Cloudy</h3>
    <ProductsRow
    	products={products.bases.filter(b => b.category === 'Cloudy')}
    	pickProduct={pickProduct}
    />
    <h3 className='text-center'>Snowy</h3>
    <ProductsRow
    	products={products.bases.filter(b => b.category === 'Snowy')}
    	pickProduct={pickProduct}
    />
    <h3 className='text-center'>Sunny</h3>
    <ProductsRow
    	products={products.bases.filter(b => b.category === 'Sunny')}
    	pickProduct={pickProduct}
    />
  </div>
)

import {pickProduct} from 'APP/app/reducers/products'
import {connect} from 'react-redux'

export default connect (
  (state, ownProps) => ({ products: state.products }),{pickProduct},
) (Products)
