/*jshint esversion: 6 */
// init weather obj
const weather = new Weather("Boston", "MA");

// get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
  weather
    .getWeather()
    .then(results => {
      console.log(results);
    })
    .catch(err => console.log(err));
}
