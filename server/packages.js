'use strict'

const db = require('APP/db')
const Package = db.model('package')

const {forbidden} = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', (req, res, next) => 
		Package.findAll()
		.then(packages => res.json(packages))
		.catch(next))
	.get('/:packageType', (req, res, next) => 
		Package.findAll({
			where: {
				packageType: req.params.packageType
			}
		})
		.then(foundPackages => res.json(foundPackages))
		.catch(next))
	.get('/:id', (req, res, next) => 
		Package.findById(req.params.id)
		.then(foundPackage => res.json(foundPackage))
		.catch(next))
	.get('/:rating', (req, res, next) => 
		Package.findAll({
			where: { rating: req.params.rating }
		})
		.then(foundPackages => res.json(foundPackages))
		.catch(next))
	.post('/', /*forbidden('only admins can create a package'),*/ (req, res, next) =>
		Package.create(req.body)
		.then(createdPackage => res.status(201).json(createdPackage))
		.catch(next))
	.delete('/:id', /*forbidden('only admins can create a city'),*/ (req, res, next) => 
		Package.destroy({
			where: { id: req.params.Package }
		})
		.then(foundPackage => res.json(foundPackage))
		.catch(next))
