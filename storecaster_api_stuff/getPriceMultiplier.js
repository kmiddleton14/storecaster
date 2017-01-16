const getWeather = require('./getWeatherForDateAndLocation');
const cities = [
  {"_id":4070245,"name":"Jones Crossroads","country":"US","coord":{"lon":-85.484657,"lat":31.21073}},
  {"_id":4344544,"name":"Vernon Parish","country":"US","coord":{"lon":-93.183502,"lat":31.11685}},
  {"_id":4215307,"name":"Pennick","country":"US","coord":{"lon":-81.55899,"lat":31.313}},
  {"_id":5285039,"name":"Black Bear Spring","country":"US","coord":{"lon":-110.288139,"lat":31.386209}},
  {"_id":4673179,"name":"Bee House","country":"US","coord":{"lon":-98.081139,"lat":31.40266}},
  {"_id":4047656,"name":"Provo","country":"US","coord":{"lon":-94.107697,"lat":34.037609}},
  {"_id":5493998,"name":"Tejon","country":"US","coord":{"lon":-105.28611,"lat":34.58979}},
];

//This works! 
// cities.forEach(city => {
// 	getWeather(city.coord.lat, city.coord.lon);
// });

const myConditionsObj = {
  precipIntensity, // 
  precipProbability, // when this goes down price multiplier goes up 
  precipType, // if this is not === 'hail' or 'rain' or 'snow' or does not exist (when there is no precip), price goes up
  temperatureMin, temperatureMax,//we take min and max temp and avg it to get the day's average temp. then for however many degrees above freezing that temp is, snow/hail are more expensive. tropical storms and 'hot' weather, etc. are more expensive for lower temps. 
  humidity, //lower humidity makes it harder to get rain and associated weather, so price goes up in scale. 
  windSpeed, //lower wind speed will increase price for wind-related weather (breeze, light breeze, storm, hurricane, tornado). We can decide if we want to do this in the other direction/in a more granular way, where lower wind speeds would also make it cost more for a tornado. 
  visibility, cloudCover, // these two will make 'clear'/cloudy weather patterns more expensive. also, high visibility/low cloud cover will make any type of precipitation (which requires clouds) more expensive, because cloud seeding is expensive. 
}; 
const getPriceMultiplier = (condition, city, date) => {
	getWeather(city.coord.lat, city.coord.lon, date)
	.then(dataForDay => {
		//each condition has a utility function that grabs certain properties off the dataForDay object and multiplies the base price by the values 
		const multiplier = require('./utils')[condition];
		return multiplier(dataForDay);
	})
	.catch(e => console.log(e));
};