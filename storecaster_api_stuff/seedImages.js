const weatherbases = require('./data/bases');
const weatherextras = require('./data/extras');
const fs = require('fs');
const rp = require('request-promise');

const makeAll = (listOfItems) => {
	return new Promise(function(resolve, reject) {
		const itemsWithImages = []
		listOfItems.forEach(item => {
			const searchQuery = item.name.toLowerCase().split(' ').join('+')
			const options = {
			    method: 'GET',
			    uri: `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=dc6zaTOxFJmzC&limit=1`, //public beta api key
			    json: true,
			};
			 
			rp(options)
			    .then(function (response) {
			        if (response.data !== undefined && response.data[0] !== undefined) {
			        	item.imageURL = response.data[0].images.original.url
			        }
			        itemsWithImages.push(item)
			    })
			    .then(() => {
			    	if (listOfItems.indexOf(item) === listOfItems.length - 1) resolve(itemsWithImages)
			    })
			    .catch(function (err) {
			        console.log('Oh no! An error!', err)
			    });
		})
	})
}

makeAll(weatherbases)
	.then(allBasesWithImages => 
		fs.writeFile('data/basesWithImages.js', ('module.exports = ' + (JSON.stringify(allBasesWithImages, null, 4))), function(err) {
			    console.log('data/basesWithImages.js successfully written.');
	}))
	.then(() => makeAll(weatherextras))
	.then(allExtrasWithImages => 
		fs.writeFile('data/extrasWithImages.js', ('module.exports = ' + (JSON.stringify(allExtrasWithImages, null, 4))), function(err) {
				console.log('data/extrasWithImages.js successfully written.');
		}))