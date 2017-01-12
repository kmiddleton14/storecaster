const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const WeatherBase = require('APP/db/models/weatherbase')
const app = require('APP/server/start')

describe('/api/weatherbases', () => {

  before('create weather bases', () =>
    db.didSync
      .then(() =>
        WeatherBase.create({
          category: 'Drizzle',
          name: 'Light Rain',
          description: 'A refreshing misty rain',
          basePrice: 60.00,
          imageURL: 'http://google.com/'
        })
      )
      .then(() =>
        WeatherBase.create({
          category: 'Rain',
          name: 'Freezing Rain',
          description: 'Rain so cold, your enemies won\'t appreciate it',
          basePrice: 80.00,
          imageURL: 'http://google.com/'
        })
      )
  )

  describe('weather bases api routes', () => {
    it('GET / returns all weather bases', () =>
      request(app)
        .get(`/api/weatherbases`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include.keys('name');
          expect(res.body[0]).to.have.property('name', 'Light Rain');
        })
    )

    it('PUT updates a weather base', () =>
      request(app)
        .put('/api/weatherbases/1')
        .send({
          name: 'Breezy Rain'
        })
        .expect(201)
        .expect(function (res) {
          expect(res.body.weatherbase.name).to.equal('Breezy Rain');
          expect(res.body.weatherbase.id).to.not.be.an('undefined');
          expect(res.body.message).to.equal('Updated successfully!')
        })
    )

    it('POST creates a weather base', () =>
      request(app)
        .post('/api/weatherbases')
        .send({
          category: 'Drizzle',
          name: 'Light Rain',
          description: 'A refreshing misty rain',
          basePrice: 60.00,
          imageURL: 'http://google.com/'
        })
        .expect(201)
    )

    it('DELETE deletes a weather base', () =>
      request(app)
        .delete('/api/weatherbases/1')
        .then(res => {
          expect(res.body).to.equal(1)
        })
    )
  })

  after(() =>
    WeatherBase.truncate({ cascade: true })
    .then(() => console.log('WeatherBase table cleared after testing!'))
  )
})
