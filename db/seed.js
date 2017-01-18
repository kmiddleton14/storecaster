const db = require('APP/db');
const bases = require('APP/storecaster_api_stuff/data/basesWithImages');
const extras = require('APP/storecaster_api_stuff/data/extrasWithImages');
const cities = require('APP/storecaster_api_stuff/data/cities');

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user));

const seedCities = () => db.Promise.map(cities, city => db.model('city').create(city));
const seedBases = () => db.Promise.map(bases, base => db.model('weatherbase').create(base));
const seedExtras = () => db.Promise.map(extras, extra => db.model('weatherextra').create(extra));

const seedPackages = () => db.Promise.map([
  {
    id: 1,
    name: 'Sun With Extra Sparkle',
    description: 'Beautiful sunny skies for your perfect vacation, sunblock required.',
    imageURL: 'https://media.giphy.com/media/UL3OeJc5w7qRq/source.gif',
    packageType: 'template',
    base_id: 1,
  },
    {
    id: 2,
    name: 'The Ultimate Thunderstorm',
    description: 'A powerful rainstorm accompanied by a frequent crack of lightning.',
    imageURL: 'https://media.giphy.com/media/8xY1YYpEZ4dws/giphy.gif',
    packageType: 'custom',
    base_id: 2,
    },
], package => db.model('package').create(package));

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  //.then(seedCities)
  //.then(cities => console.log(`Seeded ${cities.length} cities OK`))
  .then(seedBases)
  .then(bases => console.log(`Seeded ${bases.length} bases OK`))
  .then(seedExtras)
  .then(extras => console.log(`Seeded ${extras.length} extras OK`))
  .then(seedPackages)
  .then(packages => console.log(`Seeded ${packages.length} packages OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
