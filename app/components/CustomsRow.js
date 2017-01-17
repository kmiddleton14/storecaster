import React from 'react';
import { Link } from 'react-router';

export default ({ items=[], selectItem }) => 
    <div>
     {
      items.map(item => (
        <li key={item.id} onClick={() => selectItem(item)}>
          {
            item.category && 
            <div><h1>{item.category}</h1></div>
          }
          <h2>{item.name}</h2>
          <h3>{item.description}</h3>
          <img 
            src={item.imageURL} 
          />
          <h3>{item.basePrice}</h3>
        </li>
      ))
    }
    </div>