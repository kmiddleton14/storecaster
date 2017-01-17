'use strict';

const db = require('APP/db')
const Package = db.models.package
const WeatherBase = db.models.weatherbase
const WeatherExtra = db.models.weatherextra
const {expect} = require('chai')

describe('package', () => {
  before('wait for the db', () => db.didSync
  .then(() => { //seed db with test data
    WeatherBase.create({
      id: 1,
      category: 'Rainy',
      name: 'thunderstorm with heavy rain',
      description: 'A booming thunderstorm with a torrential downpour. Wow!',
      basePrice: 50.00,
      imageURL: 'https://i.ytimg.com/vi/jB-7Y5eDfXk/maxresdefault.jpg'
    })
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

  }))

  const examplePackage = {
    name: 'Sun with extra sparkle',
    description: 'A fun package for your vacation',
    imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
    packageType: 'template'
  }

  it('has all the expected properties', () =>
    Package.create(examplePackage)
    .then(Package => {
        expect(Package.name).to.equal(examplePackage.name);
        expect(Package.description).to.equal(examplePackage.description);
        expect(Package.imageURL).to.equal(examplePackage.imageURL);
        expect(Package.packageType).to.equal(examplePackage.packageType);
    })
  )

  it('does not save record in the database if no description is provided', () => {
    delete examplePackage.description;
     Package.create(examplePackage)
    .then(Package => {
        expect(Package.description).to.equal("");
    })
  })

  it('does not save record in the database if no packageType is provided', () => {
    delete examplePackage.packageType;
    let thePackage = Package.build(examplePackage);
    thePackage.validate()
      .then(result => expect(result.errors).to.exist)
  })

  let customPackageId;

  it('has a class method called createWithExtras that takes in params (baseId, packageType, extrasArray, name=null, description=null, imageURL=null) and returns _____', () => {
    return Package.createWithExtras(1, 'custom', [1, 2])
      .then(createdPackage => {

        expect(createdPackage).to.be.an('object');
        expect(createdPackage.base_id).to.equal(1);
        expect(createdPackage.packageType).to.equal('custom');

        //checks to see whether eager loading worked for other associated tables 
        expect(createdPackage).to.include.keys('base', 'weatherextras', 'reviews', 'orders');

        //Checks to see if weatherextras has been eagerly loaded
        expect(createdPackage.weatherextras).to.be.an('array');
        expect(createdPackage.weatherextras[0].name).to.equal('Smoke');
        expect(createdPackage.weatherextras[1].name).to.equal('Mist');

        //Checks to see if base has been eagerly loaded
        expect(createdPackage.base.id).to.equal(1);

        //so the package created in this one can be used for the next test
        customPackageId = createdPackage.id;
      })
  })

  describe('instance method called basePrice calculates a price based on the price of the weather extras and base associated with it, and sets the "price" property (default by null) on the instance', () => {

      it('calculates the correct price for a package with extras', () => 
        Package.findById(customPackageId)
        .then(customPackage => customPackage.basePrice()
          .then(() => expect(customPackage).to.have.property('price', (115.93 + 50.00 + 124.19))))
      )

      it('calculates the correct price for a package with only a base', () => 
        Package.create({
          packageType: 'custom', 
          base_id: 1
        })
        .then(createdPackage => createdPackage.basePrice()
          .then(() => expect(createdPackage).to.have.property('price', 50.00)))
      )
  })

  xit('does not allow packageType other than Template and Custom', () => {
    examplePackage.packageType = 'other';
    let thePackage = Package.build(examplePackage);
    thePackage.validate()
      .then(result => expect(result.errors).to.exist)
  })

  after(() => 
    Package.truncate({ cascade: true })
    .then(() => console.log("Package table cleared after testing!"))
    .then(() => WeatherBase.truncate({cascade: true}))
    .then(() => WeatherExtra.truncate({cascade: true}))
    .then(console.log('WeatherBase and WeatherExtra tables cleared after testing!')))
})

