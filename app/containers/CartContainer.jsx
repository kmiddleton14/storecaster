import React, { Component } from 'react';
import Cart from '../components/Cart';
import { connect } from 'react-redux';

//Need to add mapStateToProps?
  //Need to grab the selected package from the state

const mapDispatchToProps = (dispatch) => {
  return {
    addNewOrder (orderName) {
      //TODO: add dispatcher for adding order
      dispatch(addOrder(orderName));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameInputValue: '',
      cityInputValue: '',
      startDateInputValue: ''
      // dirty: false
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleDateChange (evt) {
    const value = evt.target.value;
    this.setState({
      startDateInputValue: value
      // dirty: true
    });
  }
  //TODO: change the handle submit function here
  handleSubmit (evt) {
    evt.preventDefault();
    this.props.addNewOrder(this.state.inputValue);
    this.setState({
      nameInputValue: '',
      cityInputValue: '',
      startDateInputValue: ''
      // dirty: false
    });
  }

  calculatePrice() {
    //TODO
  }

  render () {
    const dirty = this.state.dirty;
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
        selectedPackage={this.state.selectedPackage}
        totalPrice={this.calculatePrice}
        // warning={warning}
      />
    );
  }
});
