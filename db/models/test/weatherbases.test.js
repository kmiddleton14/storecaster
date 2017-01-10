'use strict';

const db = require('APP/db')
const WeatherBase = require('APP/db/models/weatherbase')
const {expect} = require('chai')

describe('WeatherBase', () => {
  before('wait for the db', () => db.didSync)

  const exampleWeatherBase = {
    category: 'Thunderstorm',
    name: 'thunderstorm with heavy rain',
    description: 'A booming thunderstorm with a torrential downpour. Wow!',
    basePrice: 50.00,
    imageURL: 'https://i.ytimg.com/vi/jB-7Y5eDfXk/maxresdefault.jpg'
  }

  let ourWeatherBase;

  beforeEach(() => {
    ourWeatherBase = WeatherBase.build(exampleWeatherBase)
  })

  it('has category, name, description, base price, and imageURL', () =>
    ourWeatherBase.save()
    .then(weatherbase => {
        expect(weatherbase.category).to.equal(exampleWeatherBase.category);
        expect(weatherbase.name).to.equal(exampleWeatherBase.name);
        expect(weatherbase.description).to.equal(exampleWeatherBase.description);exampleWeatherBase
        expect(weatherbase.basePrice).to.equal(exampleWeatherBase.basePrice.toFixed(2));
        expect(weatherbase.imageURL).to.equal(exampleWeatherBase.imageURL);
    })
  )

  it('cannot be created with an invalid image URL', () => {
    ourWeatherBase.imageURL = 'hello world!';
    return ourWeatherBase.validate()
    .then(result => {
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).to.contain('Validation error: Validation isUrl failed');
    })
  })  

  it('cannot be created with an invalid category', () => {
    ourWeatherBase.category = 'HelloWorld';
    return ourWeatherBase.save()
    .catch(err => {
      expect(err).to.be.an('object');
      expect(err.message).to.contain('invalid input value for enum enum_weatherbase_category: "HelloWorld"');
    })
  })
})
