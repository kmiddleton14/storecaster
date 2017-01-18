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
    imageURL: 'https://media.giphy.com/media/WwJBRCWrpdTsk/giphy.gif',
    packageType: 'template',
    base_id: 32,
    price: 699.99
  },
    {
    id: 2,
    name: 'The Ultimate Thunderstorm',
    description: 'A powerful rainstorm accompanied by frequent lightning strikes.',
    imageURL: 'http://stormandsky.com/gif/4.gif',
    packageType: 'template',
    base_id: 2,
    price: 599.99
    },
    {
    id: 3,
    name: 'Winter Wonderland',
    description: 'Turn your ski destination into a winter wonderland with a flurry of targeted blizzards.',
    imageURL: 'https://68.media.tumblr.com/8bfc07f474e5fdff8b77d8a9280630ac/tumblr_oali2oVkqD1rc0yuao1_500.gif',
    packageType: 'template',
    base_id: 23,
    price: 374.99
    },
    {
    id: 4,
    name: 'Overcast Skies',
    description: 'Feeling blue? Your weather should reflect you.',
    imageURL: 'https://media.giphy.com/media/3o7rc6sa2RvKo8K5EI/giphy.gif',
    packageType: 'template',
    base_id: 44,
    price: 1499.99
    },
    {
    id: 5,
    name: 'Beach Bum Rays',
    description: 'Make sure you get in a productive day of tanning by buying this package of clear skies and extra sun.',
    imageURL: 'https://68.media.tumblr.com/6448069a7d82f5a2ae1a2aa46ed3da61/tumblr_o9z1ynISk91sd0k7to1_400.gif',
    packageType: 'template',
    base_id: 44,
    price: 399.99
    },
    {
    id: 6,
    name: 'Sweater Weather',
    description: 'Light drizzles outside set the scene for a perfect night in with a good book by the fireplace.',
    imageURL: 'https://s-media-cache-ak0.pinimg.com/originals/bf/f5/d0/bff5d03a2b2ad8814abfedffadfd203d.gif',
    packageType: 'template',
    base_id: 24,
    price: 299.99
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
