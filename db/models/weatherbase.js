'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const WeatherBase = db.define('weatherbase', {
  category: {
    type: Sequelize.ENUM('Rainy', 'Cloudy', 'Snowy', 'Sunny'),
    allowNull: false
  },
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

module.exports = WeatherBase;
