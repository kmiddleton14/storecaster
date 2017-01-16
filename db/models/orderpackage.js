'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const OrderPackage = db.define('orderpackage', {
  
  dateScheduled: {
    type: Sequelize.DATEONLY,
    // allowNull: false
  }
})

module.exports = OrderPackage;
