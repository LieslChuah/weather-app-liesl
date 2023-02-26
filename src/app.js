function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (hours < 7 || hours > 20) {
    let body = document.querySelector("body");
    body.classList.add("night");
  } else {
    let body = document.querySelector("body");
    body.classList.add("day");
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayDate = date.getDate();
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
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return ` ${day} ${dayDate} ${month} ${year}<br />
  Last updated at ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = date.getDay();
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row align-items-center five-day-forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
      <span class="five-day-forecast-day">${formatDay(forecastDay.time)}</span>
      <img src="${forecastDay.condition.icon_url}" class="forecast-icon"> <br />
      <span class="five-day-forecast-min"> ${Math.round(
        forecastDay.temperature.minimum
      )}° </span> / 
      <span class="five-day-forecast-max"> ${Math.round(
        forecastDay.temperature.maximum
      )}° </span>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecastData(city) {
  let apiEndpoint = "https://api.shecodes.io/weather/v1/forecast";
  let apiKey = "32c4701d65b6ftd8c03oeb034a7b3869";
  let apiUrl = `${apiEndpoint}?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayData(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temp");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#todays-icon");
  let desciptionElement = document.querySelector("#todays-description");
  let date = document.querySelector("#date");

  celciusTemp = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(celciusTemp);
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  desciptionElement.innerHTML = response.data.condition.description;
  date.innerHTML = formatDate(response.data.time * 1000);
  console.log(response.data);
  getForecastData(response.data.city);
}

function getWeatherData(city) {
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let apiKey = "32c4701d65b6ftd8c03oeb034a7b3869";
  let apiUrl = `${apiEndpoint}?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayData);
}

function getSearchedCity(event) {
  event.preventDefault();
  let searchBarInput = document.querySelector("#search-bar-input").value;
  if (searchBarInput) {
    getWeatherData(searchBarInput);
  } else {
    alert("Please enter a city");
  }
}

function retrieveLocation(position) {
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "32c4701d65b6ftd8c03oeb034a7b3869";
  let url = `${apiEndpoint}?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayData);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemp = Math.round((celciusTemp * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemp;
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
}

function displayCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celciusTemp);
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
}

let celciusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheit);

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", displayCelcius);
celcius.classList.remove("active");

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", getSearchedCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

getWeatherData("Melbourne");
