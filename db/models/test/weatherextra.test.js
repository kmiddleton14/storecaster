'use strict';

const db = require('APP/db')
const WeatherExtra = require('APP/db/models/weatherextra')
const {expect} = require('chai')

describe('WeatherExtra', () => {
  before('wait for the db', () => db.didSync)

  const exampleWeatherExtra = {
    name: 'thunderstorm with heavy rain',
    description: 'A booming thunderstorm with a torrential downpour. Wow!',
    basePrice: 50.00,
    imageURL: 'https://i.ytimg.com/vi/jB-7Y5eDfXk/maxresdefault.jpg'
  }

  let ourWeatherExtra;

  beforeEach(() => {
    ourWeatherExtra = WeatherExtra.build(exampleWeatherExtra)
  })

  it('has name, description, base price, and imageURL', () =>
    ourWeatherExtra.save()
    .then(weatherextra => {
        expect(weatherextra.name).to.equal(exampleWeatherExtra.name);
        expect(weatherextra.description).to.equal(exampleWeatherExtra.description);
        expect(weatherextra.basePrice).to.equal(exampleWeatherExtra.basePrice.toFixed(2));
        expect(weatherextra.imageURL).to.equal(exampleWeatherExtra.imageURL);
    })
  )

  it('cannot be created with an invalid image URL', () => {
    ourWeatherExtra.imageURL = 'hello world!';
    return ourWeatherExtra.validate()
    .then(result => {
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).to.contain('Validation error: Validation isUrl failed');
    })
  })

  after(function() {
    return WeatherExtra.truncate({cascade: true})
    .then(() => console.log('Table is cleared'))
  })
})
