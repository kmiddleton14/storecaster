const rp = require('request-promise');
const moment = require('moment');
// const config = require('./config');

const getWeather = (lat, lon/*, date */) => {
  const myDate = moment('20151031', 'YYYYMMDD').unix();
  console.log(myDate);

  const key = '0d5a9c764fc198ed457aeac6f403a85d' 
  const options = {
    uri: `https://api.darksky.net/forecast/${key}/${lat},${lon},${myDate}`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };

  return rp(options)
  .then(data => {
    //return the appropriate message based on humidity
    const dataForDay = data.daily.data;

    //TODO find a way to extract these properties off the obj 
    // const myConditionsObj = {
    //   precipIntensity, 
    //   precipProbability, 
    //   precipType, 
    //   temperatureMin, 
    //   temperatureMax,
    //   humidity, 
    //   windSpeed, 
    //   visibility, 
    //   cloudCover,      
    // }; 

    return dataForDay;
  })
  .catch(e => console.log(error));
};

module.exports = getWeather;