'use strict';

const db = require('APP/db')
const Package = require('APP/db/models/package')
const {expect} = require('chai')

describe('Package', () => {
  before('wait for the db', () => db.didSync)
  const examplePackage = {
    totalPrice: 56.60,
    status: 'Completed'
  }

  it('has totalPrice and status', () =>
    Package.create(examplePackage)
    .then(Package => {
        //Node Postgres converts DECIMAL to string
        expect(Package.totalPrice).to.equal(examplePackage.totalPrice.toFixed(2));
        expect(Package.status).to.equal(examplePackage.status);
    })
  )

})

