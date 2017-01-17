import React, { Component } from 'react';
import { Link } from 'react-router';
import CustomsRow from './CustomsRow'; //TODO: maybe bases are displayed in a products row
class SelectedProduct extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedExtras: [], //consider using set data type to enforce uniqueness
    }
    this.addExtra = this.addExtra.bind(this)
  }

  toggleExtra (extra) {
    if (this.state.selectedExtras.includes(extra)) {
      var indexToRemove = this.state.selectedExtras.indexOf(extra);
      var arr = this.state.selectedExtras;
      arr.splice(indexToRemove, 1);
      this.setState({
        selectedExtras: arr
      })
    } else this.setState({
        selectedExtras: this.state.selectedExtras.concat([extra])
      })
  }

  render() {
    const createPackageAndAddToCart = this.props.createPackageAndAddToCart
    const selectedPackage = this.props.selectedPackage
    const extras = this.props.extras

    return ( 
      <div>
        <h1>Your selected product is: {selectedPackage.name}</h1>
        <h2>Description: {selectedPackage.description}</h2>
        <img 
          src={selectedPackage.imageURL} 
        />
        <h3>Price: ${selectedPackage.base.basePrice}</h3>
        <CustomsRow items={extras} selectItem={this.toggleExtra}/>
        <Link to='/cart' onClick={() => createPackageAndAddToCart(selectedPackage.base, this.state.selectedExtras)}>
          <button type='button'><h3>Add to cart</h3></button>
        </Link>
      </div>
    )
  }

}

import {createPackageAndAddToCart} from 'APP/app/reducers/orders'
import {connect} from 'react-redux'

export default connect (
  (state, ownProps) => ({ 
    selectedPackage: state.products.selectedPackage, 
    extras: state.products.extras
  }),{createPackageAndAddToCart},
) (SelectedProduct)