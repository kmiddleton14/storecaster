'use strict'

const db = require('APP/db')
const City = db.model('city')

const {forbidden,} = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', (req, res, next) => 
		City.findAll()
		.then(cities => res.json(cities))
		.catch(next))
	.post('/', /*forbidden('only admins can create a city'),*/ (req, res, next) =>
		City.create(req.body)
		.then(city => res.status(201).json(city))
		.catch(next))
	.delete('/:id', /*forbidden('only admins can create a city'),*/ (req, res, next) => 
		City.destroy({
			where: { id: req.params.id }
		})
		.then(city => res.json(city))
		.catch(next))