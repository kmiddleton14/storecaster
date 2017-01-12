const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const WeatherExtra = require('APP/db/models/weatherextra')
const app = require('APP/server/start')

describe('/api/weatherextras', () => {

  before('create weather extras', () =>
    db.didSync
      .then(() =>
        WeatherExtra.create({
          id: 1,
          name: 'Thunder',
          description: 'Add a loud rumble',
          basePrice: 70.00,
          imageURL: 'http://google.com/'
        })
      )
      .then(() =>
        WeatherExtra.create({
          name: 'Rainbow',
          description: 'A great way to end your thunderstorm',
          basePrice: 80.00,
          imageURL: 'http://google.com/'
        })
      )
  )

  describe('weather extras api routes', () => {
    it('GET / returns all weather extras', () =>
      request(app)
        .get(`/api/weatherextras`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include.keys('name');
          expect(res.body[0]).to.have.property('name', 'Thunder');
        })
    )

    it('PUT updates a weather extra', () =>
      request(app)
        .put('/api/weatherextras/1')
        .send({
          name: 'Light rain'
        })
        .expect(202)
        .expect(function (res) {
          expect(res.body.weatherextra.name).to.equal('Light rain');
          expect(res.body.weatherextra.id).to.not.be.an('undefined');
          expect(res.body.message).to.equal('Updated successfully!')
        })
    )

    it('POST creates a weather extra', () =>
      request(app)
        .post('/api/weatherextras')
        .send({
          name: 'Volcanic Ash',
          description: 'An ashy rain for your worst enemies',
          basePrice: 100.00,
          imageURL: 'http://google.com/'
        })
        .expect(201)
    )

    it('DELETE deletes a weather extra', () =>
      request(app)
        .delete('/api/weatherextras/1')
        .then(res => {
          expect(res.body).to.equal(1)
        })
    )
  })

  after(() =>
    WeatherExtra.truncate({ cascade: true })
    .then(() => console.log('WeatherExtra table cleared after testing!'))
  )
})
