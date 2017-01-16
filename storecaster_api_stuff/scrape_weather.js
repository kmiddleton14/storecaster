var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

url = 'http://openweathermap.org/weather-conditions';

request(url, function(error, response, html){

    if(!error){
        var $ = cheerio.load(html);

        const toTitleCase = str => {
            return str.replace(/\w\S*/g, txt => {
                if (txt !== 'with' && txt !== 'and') return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                else return txt;
            });
        };

        const scrapeCategories = () => {
            //scraping category titles into an array
            const categories = [];       
            $('h3').slice(3, 12).filter(function() {
                const data = $(this);
                categories.push(data.text().slice(11));
            });
            return categories;
        };

        const scrapeBases = () => {
            //scraping individual weather bases into an array of arrays sorted by category
            const elementSets = [];
            $('.table-bordered').slice(1).each(function(table) {
                const data = $(this);
                const basesRows = data.find('tr');
                const bases = basesRows.children('td:nth-child(2)');
                elementSets.push(toTitleCase(bases.text()).split('  '));
            });
            return elementSets;
        };

        const assocCatsWithBases = (cats, bases) => {
            //takes in an array of categories and an array of arrays of bases and returns an object
            const weatherLists = {};
            cats.forEach((elem, index) => {
                weatherLists[elem] = bases[index];
            });
            return weatherLists;
        };

        const convertCategory = category => {
            switch (category) {
                case 'Thunderstorm':
                    return 'Rainy';
                case 'Drizzle':
                    return 'Rainy';
                case 'Rain':
                    return 'Rainy';
                case 'Snow':
                    return 'Snowy';
                case 'Atmosphere':
                    return '';
                case 'Clear':
                    return 'Sunny';
                case 'Clouds':
                    return 'Cloudy';
                case 'Extreme':
                    return '';
                case 'Additional':
                    return '';
            }
        };

        const constructBaseObjects = (weatherLists) => {
            //takes the object returned by assocCatsWithBases and returns an array of all objects created
            let allBases = [];
            let allExtras = [];
            Object.keys(weatherLists).forEach(key => {
                if (convertCategory(key)) {
                    weatherLists[key].forEach(base => {
                        allBases.push({
                            category: convertCategory(key), 
                            name: base.trim(),
                            description: 'A placeholder description for weather base',
                            basePrice: (Math.random() * 900 + 100).toFixed(2),
                        });
                    });  
                } else {
                    weatherLists[key].forEach(extra => {
                        allExtras.push({
                            name: extra.trim(),
                            description: 'A placeholder description for weather extra',
                            basePrice: (Math.random() * 100 + 50).toFixed(2),
                        });
                    });
                }
            });
            return ({
                weatherbases: allBases, 
                weatherextras: allExtras
            })
        };

        const categories = scrapeCategories();
        const bases = scrapeBases();
        const myResults = constructBaseObjects(assocCatsWithBases(categories, bases));

        fs.writeFile('data/bases.js', ('module.exports = ' + (JSON.stringify(myResults.weatherbases, null, 4))), function(err){
            console.log('data/bases.js successfully written.');
        });

        fs.writeFile('data/extras.js', ('module.exports = ' + (JSON.stringify(myResults.weatherextras, null, 4))), function(err){
            console.log('data/extras.js successfully written.');
        });
    }
})