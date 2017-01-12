const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Review = db.models.review
const Package = db.models.package
const User = db.models.users
const app = require('APP/server/start')

//TODO, update tests to include packageId once associations are set up

//BUG: possible needs packageId? But reviews table doesn't seem to have it..
describe('/api/reviews', () => {
  let packageId, authorId
  before('create reviews, authors and packages', () =>
    db.didSync
      .then(() => 
        User.create({
          name: 'Sunny Bather',
          email: 'hello@hello.com'
        }))
      .then(user => {
        authorId = user.id
        return Package.create({
          name: 'Sun with extra sparkle',
          description: 'A fun package for your vacation',
          imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
          packageType: 'Template'
        })
      })
      .then(pkg => {
        packageId = pkg.id
        return Review.create({
          title: 'Rain on my parade',
          description: 'I am so dissatisfied, I\'m going to call my lawyer, expect a lawsuit',
          rating: '1',
          authorName: 'Rainy Day',
          package_id: packageId, 
          author_id: authorId
        })
      })
      .then(() =>
        Review.create({
          title: 'Sunshine of my life',
          description: 'The sun was amazing, finally got the tan I wanted',
          rating: '5',
          authorName: 'Sunny Bather',
          package_id: packageId, 
          author_id: authorId
      }))
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

    it('GET /package/:packageId returns all reviews by packageId', () =>
      request(app)
        .get(`/api/reviews/package/${packageId}`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include.keys('title');
          expect(res.body[0]).to.have.property('package_id', packageId);
        })
    )    

    it('GET /author/:authorId returns all reviews by authorId', () =>
      request(app)
        .get(`/api/reviews/author/${authorId}`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include.keys('title');
          expect(res.body[0]).to.have.property('author_id', authorId);
        })
    )

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
          authorName: 'Sunny Bather',
          package_id: packageId,
          author_id: authorId,
        })
        .expect(201)
    )

    it('DELETE deletes a review', () =>
      request(app)
        .delete('/api/reviews/2')
        .then(res => {
          expect(res.body).to.equal(1)
        })
    )
  })

  after(() =>
    Review.truncate({ cascade: true })
    .then(() => User.truncate({ cascade: true }))
    .then(() => Package.truncate({ cascade: true }))
    .then(() => console.log('Review, User, and Package tables cleared after testing!'))
  )
})
