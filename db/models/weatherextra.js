'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const WeatherExtra = db.define('weatherextra', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
  },
  basePrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = WeatherExtra;
