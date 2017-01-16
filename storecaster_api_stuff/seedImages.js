const weatherbases = require('./data/bases');
const weatherextras = require('./data/extras');
const fs = require('fs');
const rp = require('request-promise');
const key = process.env.CUSTOMSEARCH_KEY

const makeAll = (listOfItems) => {
	return new Promise(function(resolve, reject) {
		const itemsWithImages = []
		listOfItems.forEach(item => {
			const searchQuery = item.name.toLowerCase().split(' ').join('+')
			const start = Math.ceil(Math.random()*10) //starts at a different index every time to avoid duplicate images
			const options = {
			    method: 'GET',
			    uri: `https://www.googleapis.com/customsearch/v1?key=${key}&cx=004969510672145403380:1_mkqs9rv6a&excludeTerms=forecast&q=gif+weather&hq=${searchQuery}&searchType=image&imgColorType=color&imgSize=xxlarge&imgType=photo&start=${start}`,
			    json: true,
			};
			 
			rp(options)
			    .then(function (response) {
			    	// console.log(response);
			    	item.imageURL = response.items.slice(0, 5).map(item => item.link.match(/\.gif\b/) ? item.link : null).filter(item => item === null || item.match(/photobucket/) || item.length === 0 ? false : true)[0];
			        // if (response.data !== undefined && response.data[0] !== undefined) {
			        // 	item.imageURL = response.data[0].images.original.url
			        // }
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