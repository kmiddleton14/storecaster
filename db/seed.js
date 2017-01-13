const db = require('APP/db');

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user));

const seedCities = () => db.Promise.map([
	{	id: 1,
          name: 'New York',
          country: 'United States',
          latitude: 31.21073,
          longitude: -85.484657
        }, {
        	id: 2,
          name: 'Thousand Oaks',
          country: 'United States',
          latitude: 38.34983,
          longitude: -17.458945
        }
	], city => db.model('city').create(city));

const seedBases = () => db.Promise.map([
  {		id: 1,
          category: 'Sunny',
          name: 'Clear and sunny skies',
          description: 'A refreshing sunny day',
          basePrice: 60.00,
          imageURL:  'https://media.giphy.com/media/rXHKRU96pSJNe/giphy.gif',
        },
  	{	id: 2,
          category: 'Rainy',
          name: 'Freezing Rain',
          description: 'Rain so cold, your enemies won\'t appreciate it',
          basePrice: 80.00,
          imageURL:  'https://secure.static.tumblr.com/7029e48f96a852420c8bfd634ba650d1/jffmjun/s2Ynmcf0p/tumblr_static_tumblr_static_3y7k2nj4kneo8gswk048s4s4g_640.gif',
        },
], base => db.model('weatherbase').create(base));

const seedPackages = () => db.Promise.map([
  {
          id: 1,
          name: 'Sun with extra sparkle',
          description: 'A fun package for your vacation',
          imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
          packageType: 'template',
          base_id: 1,
        },
  	{
  	id: 2,
  	name: 'The ultimate thunderstorm',
  	description: 'This thunderstorm will be the biggest you have ever experienced',
  	imageURL: 'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif',
  	packageType: 'custom',
  	base_id: 2,
    },
], package => db.model('package').create(package));

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))  
  .then(seedCities)
  .then(cities => console.log(`Seeded ${cities.length} cities OK`))  
  .then(seedBases)
  .then(bases => console.log(`Seeded ${bases.length} bases OK`))  
  .then(seedPackages)
  .then(packages => console.log(`Seeded ${packages.length} packages OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())
