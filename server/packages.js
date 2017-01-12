'use strict'

const db = require('APP/db')
const Package = db.model('package')

const {forbidden} = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', (req, res, next) => 
		Package.findAll()
		.then(packages => res.json(packages))
		.catch(next))
	.get('/type/:packageType', (req, res, next) => 
		Package.findAll({
			where: {
				packageType: req.params.packageType.toLowerCase()
			}
		})
		.then(foundPackages => res.json(foundPackages))
		.catch(next))
	.get('/:id', (req, res, next) => 
		Package.findById(Number(req.params.id))
		.then(foundPackage => res.json(foundPackage))
		.catch(next))

	.post('/', /*forbidden('only admins can create a package'),*/ (req, res, next) =>
		Package.create(req.body)
		.then(createdPackage => res.status(201).json(createdPackage))
		.catch(next))

	.put('/:id', /*forbidden('only admins can create a base'),*/ (req, res, next) =>
	    Package.findById(req.params.id)
	    .then(foundPackage =>
	      foundPackage.update(req.body)
	    .then(updatedPackage => {
	      res.status(202).send({
	        package: updatedPackage,
	        message: 'Updated successfully!'
	      })
	    })
	    )
	    .catch(next))

	.delete('/:id', /*forbidden('only admins can create a city'),*/ (req, res, next) => 
		Package.destroy({
			where: { id: Number(req.params.id) }
		})
		.then(foundPackage => res.json(foundPackage))
		.catch(next))
