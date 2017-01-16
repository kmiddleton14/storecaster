const cities = require('./city.list.us');
const fs = require('fs');

const cityList = [];

cities.forEach(city => {
	cityList.push({
		name: city.name,
		country: city.country,
		latitude: city.coord.lat,
		longitude: city.coord.lon
	})
})

fs.writeFile('data/cities.js', ('module.exports = ' + (JSON.stringify(cityList, null, 4))), function(err){
    console.log('data/cities.js successfully written.');
});