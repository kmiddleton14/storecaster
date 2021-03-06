'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('Completed', 'Created', 'Processing', 'Cancelled'),
    allowNull: false
  }
})

module.exports = Order;
