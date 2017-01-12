'use strict'

const db = require('APP/db')
const Review = db.model('review')

const {forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next))
  .get('/package/:packageId', (req, res, next) =>
    Review.getByPackageId(req.params.packageId)
    .then(reviews => res.json(reviews))
    .catch(next))  
  .get('/author/:authorId', (req, res, next) =>
    Review.getByAuthorId(req.params.authorId)
    .then(reviews => res.json(reviews))
    .catch(next))
  .put('/:id', /*TODO: function to allow users to only update their own*/ (req, res, next) =>
    Review.findById(req.params.id)
    .then(foundReview =>
      foundReview.update(req.body)
    .then(updatedReview => {
      res.status(202).send({
        review: updatedReview,
        message: 'Updated successfully!'
      })
    })
    )
    .catch(err => console.log(err)))
  .post('/', (req, res, next) =>
    Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next))
  .delete('/:id', /*TODO: only allow user to delete own review, or admin can delete all*/ (req, res, next) =>
    Review.destroy({
      where: { id: req.params.id }
    })
    .then(review =>
      res.json(review))
    .catch(next))
