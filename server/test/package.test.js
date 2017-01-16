const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Package = require('APP/db/models/package')
const app = require('APP/server/start')

describe('/api/packages', () => {

  before('create packages', () => 
    db.didSync
      .then(() =>
        Package.create({
          id: 5001,
          name: 'Sun with extra sparkle',
          description: 'A fun package for your vacation',
          imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
          packageType: 'template'
        })
      )
      .then(() =>
        Package.create({
          id:5002,
          name: 'The ultimate thunderstorm',
          description: 'This thunderstorm will be the biggest you have ever experienced',
          imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
          packageType: 'custom'
        })
      )
  )

  describe('packages api routes', () => {
    it('GET / returns all packages', () =>
      request(app)
        .get(`/api/packages`)
        .then(res => {          
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include.keys('name');
          expect(res.body[0]).to.have.property('name', 'Sun with extra sparkle');
          //checks to see whether eager loading worked for base, reviews, extras, and orders
          expect(res.body[0]).to.include.keys('base', 'weatherextras', 'reviews', 'orders');
        })
    )

    it('GET / returns all packages with correct packageType', () =>
      request(app)
        .get(`/api/packages/type/custom`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include.keys('name');
          expect(res.body[0]).to.have.property('name', 'The ultimate thunderstorm');
          //checks to see whether eager loading worked for base, reviews, extras, and orders
          expect(res.body[0]).to.include.keys('base', 'weatherextras', 'reviews', 'orders');
        })
    )

    it('GET / returns package by id', () =>
      request(app)
        .get(`/api/packages/5001`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.include.keys('name');
          expect(res.body).to.have.property('name', 'Sun with extra sparkle');
        })
    )

    it('PUT updates a package', () =>
      request(app)
        .put('/api/packages/5001')
        .send({
          name: 'Sun with a few clouds'
        })
        .expect(202)
        .expect(function (res) {
          expect(res.body.package.name).to.equal('Sun with a few clouds');
          expect(res.body.package.id).to.not.be.an('undefined');
          expect(res.body.message).to.equal('Updated successfully!')
        })
    )

    it('POST creates a package', () =>
      request(app)
        .post('/api/packages')
        .send({
          name: 'Snow Day for the slopes',
          description: 'Best skiing snow around',
          imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
          packageType: 'template'
        })
        .expect(201)
    )

    it('DELETE deletes a package', () =>
      request(app)
        .delete('/api/packages/5001')
        .then(res => {
          expect(res.body).to.equal(1)
        })
    )
  })

  after(() =>
    Package.truncate({ cascade: true })
    .then(() => console.log('Packages table cleared after testing!'))
  )
})