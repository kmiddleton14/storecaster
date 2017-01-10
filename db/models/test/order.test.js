'use strict';

const db = require('APP/db')
const Order = require('APP/db/models/order')
const {expect} = require('chai')

describe('Order', () => {
  before('wait for the db', () => db.didSync)
  const exampleOrder = {
    totalPrice: 56.60,
    status: 'Completed'
  }

  it('has totalPrice and status', () =>
    Order.create(exampleOrder)
    .then(order => {
        //Node Postgres converts DECIMAL to string
        expect(order.totalPrice).to.equal(exampleOrder.totalPrice.toFixed(2));
        expect(order.status).to.equal(exampleOrder.status);
    })
  )

})

