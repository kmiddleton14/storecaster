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
    rating: '5'
  }

  it('has all the expected property', () =>
    Review.create(exampleReview)
    .then(Review => {
        expect(Review.authorName).to.equal(exampleReview.authorName);
        expect(Review.title).to.equal(exampleReview.title);
        expect(Review.description).to.equal(exampleReview.description);
        expect(Review.rating).to.equal(exampleReview.rating);
    })
  )

  it('does not save record in the database if no rating is provided', () => {
    delete exampleReview.rating;
    let review = Review.build(exampleReview);
    review.validate()
      .then(result => expect(result.errors).to.exist)
  })

  //TODO once associations are done we need to test the class method
  // it('getRating classMethod returns the average rating for specific packageId', () => {
  //   const package2;

  //   beforeEach(() => {
  //     package2 = Package.build({
  //       authorName: 'Susan McGee',
  //       title: 'Sun = fun',
  //       description: "The thunderstorm was extremely disappointed, not as intense as I expected",
  //       rating: '1'
  //     });
  //   });


  //   let review = Review.build(exampleReview);
  //   let review2 = Review.build(package2);
  //   Review.create(exampleReview)
  //     .then(result => expect(result.errors).to.exist)
  // })
  after(() => 
    Review.truncate({ cascade: true })
    .then(() => console.log('Review table cleared after testing!'))
  )
})
