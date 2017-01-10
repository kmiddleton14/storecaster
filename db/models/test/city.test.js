'use strict';

const db = require('APP/db')
const City = require('APP/db/models/city')
const {expect} = require('chai')

describe('City', () => {
  before('wait for the db', () => db.didSync)
  const exampleCity = {
    name: 'New York',
    country: 'United States',
    latitude: 31.21073,
    longitude: -85.484657
  }

  it('has name, country, longitude, and latitude', () =>
    City.create(exampleCity)
    .then(city => {
        expect(city.name).to.equal(exampleCity.name);
        expect(city.country).to.equal(exampleCity.country);
        expect(city.latitude).to.equal(exampleCity.latitude);
        expect(city.longitude).to.equal(exampleCity.longitude);
    })
  )

  it('has a virtual field called coordinates', () => {
    City.findOne(exampleCity)
    .then(city => {
      expect(city.coordinates).to.equal('31.21073,-85.484657')
    })
  })

})
