'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const City = db.define('city', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {
  getterMethods: {
    coordinates: function() {
      return this.latitude + ',' + this.longitude;
    }
  }
})

module.exports = City;
