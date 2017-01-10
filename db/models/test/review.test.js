'use strict';

const db = require('APP/db')
const Review = require('APP/db/models/Review')
const {expect} = require('chai')

describe('Review', () => {
  before('wait for the db', () => db.didSync)
  const exampleReview = {
    authorName: 'Susan McGee',
    title: 'Sun = fun',
    description: "The sun that I ordered was quite nice, round, and pleasant. and no i'm not talking about my husband",
    rating: '5',
    authorId: 3,
    packageId: 4
  }

  it('has all the expected property', () =>
    Review.create(exampleReview)
    .then(Review => {
        expect(Review.authorName).to.equal(exampleReview.authorName);
        expect(Review.title).to.equal(exampleReview.title);
        expect(Review.description).to.equal(exampleReview.description);
        expect(Review.rating).to.equal(exampleReview.rating);
        expect(Review.authorId).to.equal(exampleReview.authorId);
        expect(Review.packageId).to.equal(exampleReview.packageId);
    })
  )

  it('does not save record in the database if no rating is provided', () => {
    delete exampleReview.rating;
    let review = Review.build(exampleReview);
    review.validate()
      .then(result => expect(result.errors).to.exist)
  })

})
