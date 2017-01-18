import React from 'react';
import ReactDOM from 'react-dom';
const { Component } = React;
import { Link } from 'react-router';

const styles = {

    width: '28%'

};

export default class Confirmation extends Component {
  render() {
    return (
      <div className="text-center">
        <img style={styles} src='https://media.giphy.com/media/26u6dryuZH98z5KuY/giphy.gif'/>
        <h3>Thank you { this.props.name }!</h3>
        <h4>Your weather is cookin'</h4>
      </div>
    );
  }
}
