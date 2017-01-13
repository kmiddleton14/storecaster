import React from 'react';

export default ({ products=[], pickProduct }) => 
    <div>
     {
      products.map(product => (
      <li key={product.id}>
        {
          product.category && 
          <div><h1>{product.category}</h1></div>
        }
        <h2>{product.name}</h2>
        <h3>{product.description}</h3>
        <img 
          src={product.imageURL} 
          onClick={() => pickProduct(product)}
        />
        <h3>$40.00</h3>
      </li>
      ))
    }
    </div>