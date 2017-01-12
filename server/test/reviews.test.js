const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Review = require('APP/db/models/review')
const app = require('APP/server/start')

//TODO, update tests to include packageId once associations are set up

//BUG: possible needs packageId? But reviews table doesn't seem to have it..
describe('/api/reviews', () => {

  before('create reviews', () =>
    db.didSync
      .then(() =>
        Review.create({
          title: 'Rain on my parade',
          description: 'I am so dissatisfied, I\'m going to call my lawyer, expect a lawsuit',
          rating: '1',
          authorName: 'Rainy Day'
        })
      )
      .then(() =>
        Review.create({
          title: 'Sunshine of my life',
          description: 'The sun was amazing, finally got the tan I wanted',
          rating: '5',
          authorName: 'Sunny Bather'
        })
      )
  )

  describe('reviews api routes', () => {
    it('GET / returns all reviews', () =>
      request(app)
        .get(`/api/reviews`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include.keys('title');
          expect(res.body[0]).to.have.property('title', 'Rain on my parade');
        })
    )

    // it('GET / returns all reviews by packageId', () =>
    //   request(app)
    //     .get(`/api/reviews`)
    //     .then(res => {
    //       expect(res.status).to.equal(200)
    //       expect(res.body).to.be.an('array')
    //       expect(res.body[0]).to.include.keys('title');
    //       expect(res.body[0]).to.have.property('title', 'Rain on my parade');
    //     })
    // )

    it('PUT updates a review', () =>
      request(app)
        .put('/api/reviews/2')
        .send({
          rating: '3'
        })
        .expect(202)
        .expect(function (res) {
          expect(res.body.review.rating).to.equal('3');
          expect(res.body.review.id).to.not.be.an('undefined');
          expect(res.body.message).to.equal('Updated successfully!')
        })
    )

    it('POST creates a review', () =>
      request(app)
        .post('/api/reviews')
        .send({
          title: 'Sunshine of my life!!!!!!!!!!!!!!!',
          description: 'The sun was amazing, finally got the tan I wanted... not',
          rating: '4',
          authorName: 'Sunny Bather'
        })
        .expect(201)
    )

    it('DELETE deletes a review', () =>
      request(app)
        .delete('/api/reviews/1')
        .then(res => {
          expect(res.body).to.equal(1)
        })
    )
  })

  after(() =>
    Review.truncate({ cascade: true })
    .then(() => console.log('Review table cleared after testing!'))
  )
})
