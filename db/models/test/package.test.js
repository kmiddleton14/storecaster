'use strict';

const db = require('APP/db')
const Package = require('APP/db/models/package')
const {expect} = require('chai')

describe('package', () => {
  before('wait for the db', () => db.didSync)
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

  xit('does not allow packateType other than Template and Custom', () => {
    examplePackage.packageType = 'other';
    let thePackage = Package.build(examplePackage);
    thePackage.validate()
      .then(result => expect(result.errors).to.exist)
  })

  after(() => {
    Package.truncate({ cascade: true })
    .then( () => console.log("Package table cleared after testing!"))

  })

})


