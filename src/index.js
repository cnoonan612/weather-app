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
let hour = now.getHours();

if (hour < 10) {
  hour = `0${hour}`;
}

let morningEvening = "pm";
if (now.getHours() <= 11) {
  morningEvening = "am";
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

document.querySelector(
  "h3"
).innerHTML = `${day}, ${month} ${date} ${hour}:${minutes} ${morningEvening}`;


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c518f4649f44824aadf43797b42ec4db";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = `humidity: ${Math.round(response.data.main.humidity)}%`;
  document.querySelector("#wind-speed").innerHTML = `wind: ${Math.round(
    response.data.wind.speed)}mph`;
  document.querySelector("#high-temperature").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temperature").innerHTML = Math.round(
    response.data.main.temp_min
  );
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
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
  let apiKey = "c518f4649f44824aadf43797b42ec4db";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#high-temperature").innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let units = "metric";

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
