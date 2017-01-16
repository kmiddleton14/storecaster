import React, { Component } from 'react';
import Cart from '../components/Cart';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import moment from 'moment';

import {completeOrder} from 'APP/app/reducers/orders'

//Need to add mapStateToProps?
  //Need to grab the selected package from the state

const mapStateToProps = (state) => {
  return {
    selectedPackage: state.products.selectedPackage,
    currentOrder: state.orders.currentOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitCompleteOrder (orderId, dateScheduled, user_id=null) {
      dispatch(completeOrder(orderId, dateScheduled, user_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameInputValue: '',
      cityInputValue: '',
      startDateInputValue: moment()
      // dirty: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange (evt) {
    const value = evt.target.value;
    this.setState({
      nameInputValue: value
      // dirty: true
    });
  }

  handleCityChange (evt) {
    const value = evt.target.value;
    this.setState({
      cityInputValue: value
      // dirty: true
    });
  }

  handleDateChange (moment) {
    this.setState({
      startDateInputValue: moment
      // dirty: true
    });
  }
  //TODO: change the handle submit function here
  handleSubmit (evt) {
    evt.preventDefault();
    this.props.submitCompleteOrder(this.props.currentOrder.id, this.state.startDateInputValue);
    this.setState({
      nameInputValue: '',
      cityInputValue: '',
      startDateInputValue: ''
      // dirty: false
    });
    browserHistory.push('/confirmation');
  }

  calculatePrice() {
    //TODO
  }

  render () {

    const nameInputValue = this.state.nameInputValue;
    const cityInputValue = this.state.cityInputValue;
    const startDateInputValue = this.state.startDateInputValue;
    // let warning = '';

    // if (!inputValue && dirty) warning = 'You must enter a name';
    // else if (inputValue.length > 16) warning = 'Name must be less than 16 characters';

    return (
      <Cart
        handleNameChange={this.handleNameChange}
        handleCityChange={this.handleCityChange}
        handleDateChange={this.handleDateChange}
        handleSubmit={this.handleSubmit}
        nameInputValue={nameInputValue}
        cityInputValue={cityInputValue}
        startDateInputValue={startDateInputValue}
        selectedPackage={this.props.selectedPackage}
        currentOrder={this.props.currentOrder}
        totalPrice={this.calculatePrice}
        submitCompleteOrder={this.props.submitCompleteOrder}
      />
    );
  }
});
