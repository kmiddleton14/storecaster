'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const City = require('./city')
const Order = require('./order')
const WeatherBase = require('./weatherbase')
const WeatherExtra = require('./weatherextra')
const Package = require('./package')
const Review = require('./review')

module.exports = {User, City, Order, WeatherBase, WeatherExtra, Package, Review}

