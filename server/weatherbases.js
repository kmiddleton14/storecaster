'use strict'

const db = require('APP/db')
const WeatherBase = db.model('weatherbase')

const {forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    WeatherBase.findAll()
    .then(bases => res.json(bases))
    .catch(next))
  .put('/:id', /*forbidden('only admins can create a base'),*/ (req, res, next) =>
    WeatherBase.findById(req.params.id)
    .then(foundBase =>
      foundBase.update(req.body)
    .then(updatedBase => {
      res.status(202).send({
        weatherbase: updatedBase,
        message: 'Updated successfully!'
      })
    })
    )
    .catch(next))
  .post('/', /*forbidden('only admins can create a base'),*/ (req, res, next) =>
    WeatherBase.create(req.body)
    .then(base => res.status(201).json(base))
    .catch(next))
  .delete('/:id', /*forbidden('only admins can create a base'),*/ (req, res, next) =>
    WeatherBase.destroy({
      where: { id: req.params.id }
    })
    .then(base => res.json(base))
    .catch(next))
