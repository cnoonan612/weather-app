let now = new Date();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h3 = document.querySelector("h3");
h3.innerHTML = `${day}, ${month} ${date} ${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#high-temperature").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temperature").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "c518f4649f44824aadf43797b42ec4db";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function searchLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "metric";
  let apiKey = "c518f4649f44824aadf43797b42ec4db";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  currentTemperature.innerHTML = 84;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  currentTemperature.innerHTML = 29;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
