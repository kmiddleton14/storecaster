'use strict';

const db = require('APP/db')
const Package = require('APP/db/models/package')
const {expect} = require('chai')

describe('package', () => {
  before('wait for the db', () => db.didSync)
  const examplePackage = {
    description: 'Susan McGee',
    image: 'Sun = fun',
    packageType: 'Template'
  }

  it('has all the expected properties', () =>
    Package.create(examplePackage)
    .then(Package => {
        expect(Package.description).to.equal(examplePackage.description);
        expect(Package.image).to.equal(examplePackage.image);
        expect(Package.packageType).to.equal(examplePackage.packageType);
    })
  )

  it('does not save record in the database if no description is provided', () => {
    delete examplePackage.description;
    let thePackage = Package.build(examplePackage);
    thePackage.validate()
      .then(result => expect(result.errors).to.exist)
  })

  it('does not save record in the database if no packageType is provided', () => {
    delete examplePackage.packageType;
    let thePackage = Package.build(examplePackage);
    thePackage.validate()
      .then(result => expect(result.errors).to.exist)
  })

  it('does not allow packateType other than Template and Custom', () => {
    examplePackage.packageType = 'other'
    let thePackage = Package.build(examplePackage);
    thePackage.validate()
      .then(result => expect(result.errors).to.exist)
  })

})
