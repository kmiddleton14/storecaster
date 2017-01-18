'use strict'

const db = require('APP/db')
const Package = db.models.package

const {forbidden} = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', (req, res, next) => 
		Package.findAll({
			include: [{ all: true }]
		})
		.then(packages => res.json(packages))
		.catch(next))
	.get('/type/:packageType', (req, res, next) => 
		Package.findAll({
			where: {
				packageType: req.params.packageType.toLowerCase()
			},
			include: [{ all: true }]
		})
		.then(foundPackages => res.json(foundPackages))
		.catch(next))
	.get('/:id', (req, res, next) => 
		Package.findOne({
			where: {
				id: Number(req.params.id)
			},
			include: [{ all: true }]
		})
		.then(foundPackage => foundPackage.basePrice()
			.then(() => res.status(200).json(foundPackage)))
		.catch(next))
	.post('/', /*forbidden('only admins can create a package'),*/ (req, res, next) => {
		//req.body: { base, packageType[, description, name, imageURL ]}
		const name = req.body.name || `Made-to-order ${req.body.base.category} weather package`
		const description = req.body.description || `A fabulous ${req.body.base.name} made just for you`
		const imageURL = req.body.imageURL || null
		return Package.create({
			base_id: req.body.base.id, 
			packageType: req.body.packageType,
			description,
			name,
			imageURL
		})
			.then(createdPackage => 
				Package.findOne({
					where: {
						id: createdPackage.id
					},
					include: [{
						all: true
					}]
				}))
				.then(foundPackage => foundPackage.basePrice()
				.then(() => res.status(201).json(foundPackage)))
			.catch(next)
		})
	.post('/createWithExtras', (req, res, next) => {
		//req.body looks like this:
		// {
        // base: {Object}, 
        // packageType: 'custom', 
        // extraIdsArray: [1, 2] 
        // }
		const defaultName = `${req.body.base.name} with Mixins`
		const defaultDescription = `A beautiful ${req.body.base.name} that is spiced up with custom add-ins`
		return Package.createWithExtras(req.body.base.id, req.body.packageType, req.body.extraIdsArray, defaultName, defaultDescription, 'https://raphaelhertzog.com/files/2010/10/new-package-magic-300x228.jpg')
			.then(createdPkg => createdPkg.basePrice()
				.then(() => res.status(201).json(createdPkg)))
			.catch(next)		
		})
	.put('/:id', /*forbidden('only admins can update a package'),*/ (req, res, next) =>
	    Package.findById(req.params.id)
	    .then(foundPackage =>
	      foundPackage.update(req.body))
	    .then(updatedPackage => updatedPackage.basePrice()
				.then(() => res.status(202).send({
					pkg: updatedPackage, 
					message: 'Updated successfully!'
				})))
			.catch(next))
	.delete('/:id', /*forbidden('only admins can delete a package'),*/ (req, res, next) => 
		Package.destroy({
			where: { id: Number(req.params.id) }
		})
		.then(numRowsDestroyed => res.json(numRowsDestroyed))
		.catch(next))
