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
const OrderPackage = require('./orderpackage')

//associations

//create pivot table called packageextra
Package.belongsToMany(WeatherExtra, { through: 'packageextra' })
WeatherExtra.belongsToMany(Package, { through: 'packageextra' })

Package.belongsTo(WeatherBase, {as: 'base'})
WeatherBase.hasMany(Package, {foreignKey: 'base_id'})

Review.belongsTo(Package, {as: 'package'})
Package.hasMany(Review, {foreignKey: 'package_id'})
Review.belongsTo(User, {as: 'author'})
User.hasMany(Review, {foreignKey: 'author_id'})

Order.belongsToMany(Package, { through: 'orderpackage' })
OrderPackage.belongsTo(Order)
Order.hasMany(OrderPackage, {foreignKey: 'order_id'})

OrderPackage.belongsTo(Package)
Package.belongsToMany(Order, { through: 'orderpackage' })
Package.hasMany(OrderPackage, {foreignKey: 'package_id'})

Order.belongsTo(User, {as: 'user'})
User.hasMany(Order, {foreignKey: 'user_id'})
Order.belongsTo(City, {as: 'ship_city'})
City.hasMany(Order, {foreignKey: 'ship_city_id'})
//Order.belongsTo(Payment, {as: 'payment'})

module.exports = {User, City, Order, WeatherBase, WeatherExtra, Package, Review, OrderPackage}