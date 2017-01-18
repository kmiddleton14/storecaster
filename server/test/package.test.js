const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Package = db.models.package
const WeatherBase = db.models.weatherbase
const WeatherExtra = db.models.weatherextra
const app = require('APP/server/start')

describe('/api/packages', () => {

  before('create packages', () => 
    db.didSync
      .then(() => //seed db with test data
        WeatherBase.create({
          id: 1,
          category: 'Rainy',
          name: 'thunderstorm with heavy rain',
          description: 'A booming thunderstorm with a torrential downpour. Wow!',
          basePrice: 50.00,
          imageURL: 'https://i.ytimg.com/vi/jB-7Y5eDfXk/maxresdefault.jpg'
        }))
        .then(createdWeatherBase =>
          WeatherExtra.create({
            id: 1,
            name: "Smoke",
            description: "A placeholder description for weather extra",
            basePrice: 115.93,
            imageURL: "https://media1.giphy.com/media/l4Jz5CBh4xwHQuzoQ/giphy.gif"
          }))
        .then(createdExtra1 =>
          WeatherExtra.create({
            id: 2,
            name: "Mist",
            description: "A placeholder description for weather extra",
            basePrice: 124.19,
            imageURL: "https://media1.giphy.com/media/l4Jz5CBh4xwHQuzoQ/giphy.gif"
          }))
        .then(createdExtra2 => 
          Package.create({
            base_id: 1,
            id: 1,
            name: 'Sun with extra sparkle',
            description: 'A fun package for your vacation',
            imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
            packageType: 'template'
          }))
        .then(createdPackage1 =>
          Package.create({
            base_id: 1,
            id: 2,
            name: 'The ultimate thunderstorm',
            description: 'This thunderstorm will be the biggest you have ever experienced',
            imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
            packageType: 'custom'
          }))
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
        .get(`/api/packages/1`)
        .then(res => {
          // console.log(res.body)
          expect(res.status).to.equal(200)
          expect(res.body).to.include.keys('name');
          expect(res.body).to.have.property('name', 'Sun with extra sparkle');

          //checks to see whether eager loading worked for base, reviews, extras, and orders
          expect(res.body).to.include.keys('base', 'weatherextras', 'reviews', 'orders');

          //checks that the base price has been calculated for package
          expect(res.body).to.have.property('price', 50.00)
        })
    )

    it('PUT updates a package', () =>
      request(app)
        .put('/api/packages/1')
        .send({
          name: 'Sun with a few clouds'
        })
        .expect(202)
        .expect(function (res) {
          expect(res.body.pkg.name).to.equal('Sun with a few clouds');
          expect(res.body.pkg.id).to.not.be.an('undefined');
          expect(res.body.message).to.equal('Updated successfully!')

          //checks to see that the base price has been calculated for package 
          expect(res.body.pkg).to.have.property('price', 50.00)
        })
    )

    it('DELETE deletes a package', () =>
      request(app)
        .delete('/api/packages/1')
        .then(res => {
          expect(res.body).to.equal(1)
        })
    )

    describe('POST creates a package', () => {

      it('POST to / creates a package without addons', () => 
        WeatherBase.findById(1)
          .then(base => 
            request(app)
              .post('/api/packages')
              .send({
                base,
                name: 'Snow Day for the slopes',
                description: 'Best skiing snow around',
                imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
                packageType: 'template'
              })
              .expect(201)
              .expect(function(res) {

                //checks that the base price has been calculated for package
                expect(res.body).to.have.property('price', 50.00)

              })
            )
      )

      it('POST to /createWithExtras creates a package with addons and adds associations to the weatherextras table through the packageextras pivot table', () => 
        WeatherBase.findById(1)
        .then(base => 
          request(app)
            .post('/api/packages/createWithExtras')
            .send({
                base, 
                packageType: 'custom', 
                extraIdsArray: [1, 2] 
              })
            .then(res => {          
              expect(res.status).to.equal(201)
              expect(res.body).to.be.an('object')
              expect(res.body).to.have.property('name', 'thunderstorm with heavy rain with mixins');
              //checks to see whether eager loading worked for base, reviews, extras, and orders
              expect(res.body).to.include.keys('base', 'weatherextras', 'reviews', 'orders');

              //checks that the base price has been calculated for package
              expect(res.body).to.have.property('price', 290.12)
            })
        ))
      })
    })

  after(() =>
    Package.truncate({ cascade: true })
      .then(() => WeatherBase.truncate({cascade: true}))
      .then(() => WeatherExtra.truncate({cascade: true}))
      .then(console.log('Package, WeatherBase and WeatherExtra tables cleared after testing!'))
    )
})