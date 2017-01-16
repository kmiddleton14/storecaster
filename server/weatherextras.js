'use strict'

const db = require('APP/db')
const WeatherExtra = db.model('weatherextra')

const {forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    WeatherExtra.findAll()
    .then(extra => res.json(extra))
    .catch(next))
  .put('/:id', /*forbidden('only admins can create a extra'),*/ (req, res, next) =>
    WeatherExtra.findById(req.params.id)
      .then(foundExtra => foundExtra.update(req.body))
      .then(updatedExtra =>
        res.status(202).send({
          weatherextra: updatedExtra,
          message: 'Updated successfully!'
      }))
      .catch(next))
  .post('/', /*forbidden('only admins can create a extra'),*/ (req, res, next) =>
    WeatherExtra.create(req.body)
    .then(extra => res.status(201).json(extra))
    .catch(next))
  .delete('/:id', /*forbidden('only admins can create a extra'),*/ (req, res, next) =>
    WeatherExtra.destroy({
      where: { id: req.params.id }
    })
    .then(extra => res.json(extra))
    .catch(next))
