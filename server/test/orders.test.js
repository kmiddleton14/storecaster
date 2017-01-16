const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Order = db.models.order
const OrderPackage = db.models.orderpackage
const Package = db.models.package
const User = db.models.users
const City = db.models.city
const app = require('APP/server/start')

//TODO: Routes need to be fixed first for these tests to work
describe('/api/orders', () => {
  let packageId, orderId, userId, cityId
  before('Seed database with testing data for orders, packages, city, user', () =>
    db.didSync
      .then(() => {
        return User.create({
          name: 'Sunny Bather',
          email: 'hello@hello.com'
        })
      })
      .then(createdUser => {
        userId = createdUser.id
        return City.create({
          name: 'New York',
          country: 'United States',
          latitude: 31.21073,
          longitude: -85.484657
        })
      })
      .then(createdCity => {
        cityId = createdCity.id
        return Order.create({
          user_id: userId,
          totalPrice: 670.00,
          status: 'Created',
          ship_city_id: cityId
        })
      })
      .then(createdOrder => {
        orderId = createdOrder.id
        return Package.create({
          name: 'Sun with extra sparkle',
          description: 'A fun package for your vacation',
          imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
          packageType: 'template'
        })
      })
      .then(createdPackage => {
        packageId = createdPackage.id
        return OrderPackage.create({
          order_id: orderId,
          package_id: packageId,
          dateScheduled: '2017-01-11'
        })
      })
  )

  describe('orders api routes', () => {
    xit('GET / returns all orders', () =>
      request(app)
        .get(`/api/orders`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include.keys('totalPrice');
          expect(res.body[0]).to.have.property('totalPrice', 670.00);
        })
    )

    xit('GET /user/:userId returns all orders by user_id', () =>
      request(app)
        .get(`/api/orders/user/${userId}`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include.keys('totalPrice');
          expect(res.body[0]).to.have.property('order_id', orderId);
        })
    )

    xit('PUT updates an order', () =>
      request(app)
        .put('/api/orders/2')
        .send({
          status: 'Completed'
        })
        .expect(202)
        .expect(function (res) {
          expect(res.body.order.status).to.equal('Completed');
          expect(res.body.order.id).to.not.be.an('undefined');
          expect(res.body.message).to.equal('Updated successfully!')
        })
    )

    it('POST creates an order', () =>
      request(app)
        .post('/api/orders')
        .send({
          order: {
            id: 3007,
            user_id: userId,
            totalPrice: 350.00,
            status: 'Created',
            // ship_city_id: cityId
          },
          package_id: packageId,
          // dateScheduled: '2017-09-18'
        })
        .expect(201)
        .expect(function(res) {
          console.log(res.body)
          expect(res.body).to.be.an('object');
          expect(res.body.order_id).to.equal(3007);
          expect(res.body.package_id).to.equal(packageId);

          //Checks to see if order has been eagerly loaded
          expect(res.body.order.id).to.equal(3007);
          expect(res.body.order.status).to.equal('Created');

          //Checks to see if Package has been eagerly loaded
          expect(res.body.package.id).to.equal(packageId);
        })
    )

    xit('DELETE deletes a order', () =>
      request(app)
        .delete('/api/orders/2')
        .then(res => {
          expect(res.body).to.equal(1)
        })
    )
  })

  // after(() =>
  //   Order.truncate({ cascade: true })
  //   .then(() => User.truncate({ cascade: true }))
  //   .then(() => Package.truncate({ cascade: true }))
  //   .then(() => OrderPackage.truncate({ cascade: true }))
  //   .then(() => City.truncate({ cascade: true }))
  //   .then(() => console.log('Order, Package, OrderPackage, City tables cleared after testing!'))
  // )
})
