'use strict'

const db = require('APP/db')
const User = require('APP/db/models/user')
const {expect} = require('chai')

describe('User', () => {
  before('wait for the db', () => db.didSync)

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      User.create({ password: 'ok' })
        .then(user => user.authenticate('ok'))
        .then(result => expect(result).to.be.true))

    it("resolves false if the password doesn't match", () =>
      User.create({ password: 'ok' })
        .then(user => user.authenticate('not ok'))
        .then(result => expect(result).to.be.false))
  })

  describe('verify user information gets stored in database', () => {
    it('user has valid email', () => {
      User.create({ email: 'user@test.com' })
        .then(user => {
          expect(user.dataValues.email).to.equal('user@test.com')
        })
      })

    it("user without valid email cannot be saved to database", () => {
      let user = User.build({ email: 'incorrectemail' });
      user.validate()
        .then(result => expect(result.errors).to.exist)
    })


    it("user with empty email cannot be saved", () => {
      let user = User.build({ email: '' });
      user.validate()
        .then(result => expect(result.errors).to.exist)
    })
  })
})