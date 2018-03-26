/*jshint esversion: 6 */

// init storage
const storage = new Storage();
// get storade location data
const weatherLocation = storage.getLocationData();
// init weather obj
const weather = new Weather(weatherLocation.city, weatherLocation.state);
// init ui

const ui = new UI();
// get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// chage location event
document.getElementById('w-change-btn').addEventListener('click', e => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  weather.changeLocation(city, state);

  // set location in LS
  storage.setLocationData(city, state);
  // get weather again
  getWeather();

  // Close modal
  $('#locModal').modal('hide');
});
function getWeather() {
  weather
    .getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
