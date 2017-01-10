'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  rating: {
    type: Sequelize.ENUM('1', '2', '3', '4', '5'),
    allowNull: false
  },
  //TODO: authorId should be validated against userId in the user table (association methods)
  authorId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  //TODO: packageId should be validated against userId in the user table (association methods)
  packageId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  authorName: {
    type: Sequelize.STRING,
    allowNull: false         //if no name is provided, should result to "anonymous"
  },
})

module.exports = Review;
