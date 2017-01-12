'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.ENUM('1', '2', '3', '4', '5'),
    allowNull: false
  },
  authorName: {
    type: Sequelize.STRING,
    //if no name is provided, should result to "anonymous"
    defaultValue: 'anonymous',
    allowNull: false
  },
}, {

  classMethods: {
    //The caller of this function can calculate the average ratings by dividing total of all ratings by their number
    getByPackageId: (pkgId) => {
      return Review.findAll({
        where: {
          package_id: pkgId
        }
      })
    },
    getByAuthorId: (authorId) => {
      return Review.findAll({
        where: {
          author_id: authorId
        }
      })
    }
  }
})

module.exports = Review;
