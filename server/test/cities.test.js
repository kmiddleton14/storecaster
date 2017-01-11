const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const City = require('APP/db/models/city')
const app = require('APP/server/start')

describe('/api/cities', () => {

  before('create cities', () =>
    db.didSync
      .then(() =>
        City.create({
          name: 'New York',
          country: 'United States',
          latitude: 31.21073,
          longitude: -85.484657
        })
      )
      .then(() => 
        City.create({
          name: 'Thousand Oaks',
          country: 'United States',
          latitude: 38.34983,
          longitude: -17.458945
        })
      )
  )

  describe('cities api routes', () => {
    it('GET / returns all cities', () =>
      request(app)
        .get(`/api/cities`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include.keys('name');
          expect(res.body[0]).to.have.property('name', 'New York');
        })
    )    

    it('POST creates a city', () =>
      request(app)
        .post('/api/cities')
        .send({
          name: 'Grace Hoppertown',
          country: 'United States',
          latitude: 13.37293,
          longitude: -29.34090
        })
        .expect(201)
    )

    it('DELETE deletes a city', () =>
      request(app)
        .delete('/api/cities/1')
        .then(res => {
          expect(res.body).to.equal(1)
        })
    )
  })
})