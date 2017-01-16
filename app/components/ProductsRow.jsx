import React from 'react';
import { Link } from 'react-router';

export default ({ products=[], pickProduct }) => 
    <div>
     {
      products.map(product => (
      <Link key={product.id} to={`/selectedproduct`} onClick={() => pickProduct(product)}>
        <li>
          {
            product.category && 
            <div><h1>{product.category}</h1></div>
          }
          <h2>{product.name}</h2>
          <h3>{product.description}</h3>
          <img 
            src={product.imageURL} 
          />
          <h3>$40.00</h3>
        </li>
      </Link>
      ))
    }
    </div>