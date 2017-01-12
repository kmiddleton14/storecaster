'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const Package = db.define('package', {
  name: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ""
  },
  imageURL: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  packageType: {
    type: Sequelize.ENUM('template', 'custom'),
    allowNull: false
  }
})

module.exports = Package;
