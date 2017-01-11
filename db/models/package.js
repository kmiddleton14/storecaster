'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const Package = db.define('package', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  packageType: {
    type: Sequelize.ENUM('Template', 'Custom'),
    allowNull: false
  }
})

module.exports = Package;
