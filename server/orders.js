'use strict'

const db = require('APP/db')
const Order = db.model('order')
const OrderPackage = db.model('orderpackage')

const {forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    //Admin only route?
    Order.findAll({
      include: [{
        model: OrderPackage
      }]
    })
    .then(orders => res.json(orders))
    .catch(next))
  .get('/user/:userId', (req, res, next) =>
    Order.findAll({
      include: [{
        model: OrderPackage,
        as: "OrderPackage",
        where: {
          user_id: req.params.userId
        }
      }]
    })
    .then(orders => res.json(orders))
    .catch(next))
  .put('/:id', /*TODO: function to allow users to only update their own*/ (req, res, next) =>
    Order.findById(req.params.id)
    .then(foundOrder =>
      foundOrder.update(req.body)
    .then(updatedOrder => {
      res.status(202).send({
        order: updatedOrder,
        message: 'Updated successfully!'
      })
    })
    )
    .catch(err => console.log(err)))

  //update the date scheduled for orderpackage table
  .put('/orderpackage/:orderId', (req, res, next) =>
    OrderPackage.findById(req.params.orderId)
    .then(foundOrder =>
      foundOrder.update(req.body)
    .then(updatedOrder => {
      res.status(202).send({
        order: updatedOrder,
        message: 'Updated successfully!'
      })
    })
    )
    .catch(err => console.log(err)))
  .post('/', (req, res, next) =>
    Order.create(req.body.order)
    .then(createdOrder => {
      // console.dir(createdOrder)
      return OrderPackage.create({
        order_id: createdOrder.id,
        package_id: req.body.package_id,
        //dateScheduled: req.body.dateScheduled
      })
      .then( newOrderPackage => {
        // console.log(newOrderPackage);
        return OrderPackage.findOne({
          where: {
            order_id: createdOrder.id
          },
          include: [{ all: true }],
        })
      })
      .then(fullOrderInfo => {
        res.status(201).json(fullOrderInfo)
      })
    })
    .catch(next)
  })
  .delete('/:id', /*TODO: only allow user to delete own order, or admin can delete all*/ (req, res, next) =>
    Order.destroy({
      where: { id: req.params.id }
    })
    .then(numRowsDestroyed =>
      res.json(numRowsDestroyed))
    .catch(next))
