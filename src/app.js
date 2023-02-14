function formatDate(date) {
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

  let dayHour = document.querySelector("#day-hour");
  let todaysDate = document.querySelector("#todays-date");
  dayHour.innerHTML = `${day} ${hours}:${minutes}`;
  todaysDate.innerHTML = `${dayDate} ${month} ${year}`;
}
let date = new Date();
formatDate(date);

function convertToFahrenheit(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("#current-temp");
  let fahrenheitTemp = Math.round((celciusTemp.innerHTML * 9) / 5 + 32);
  celciusTemp.innerHTML = `${fahrenheitTemp}`;

  fahrenheit.removeEventListener("click", convertToFahrenheit);

  function refreshTemp() {
    let refreshedTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
    celciusTemp.innerHTML = `${refreshedTemp}`;

    fahrenheit.addEventListener("click", convertToFahrenheit);
  }
  let celcius = document.querySelector("#celcius-button");
  celcius.addEventListener("click", refreshTemp);
}

let fahrenheit = document.querySelector("#fahrenheit-button");
fahrenheit.addEventListener("click", convertToFahrenheit);

function getSearchedCity(event) {
  event.preventDefault();
  let searchBarInput = document.querySelector("#search-bar-input").value;
  if (searchBarInput) {
    getWeatherData(searchBarInput);
  } else {
    alert("Please enter a city");
  }
}

function getWeatherData(city) {
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let apiKey = "32c4701d65b6ftd8c03oeb034a7b3869";
  let apiUrl = `${apiEndpoint}?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayData);
}

function displayData(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document
    .querySelector("#todays-icon")
    .setAttribute("src", response.data.condition.icon_url);
  document.querySelector("#todays-description").innerHTML =
    response.data.condition.description;
  console.log(response);
}

function retrieveLocation(position) {
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let lon = position.data.coordinates.longitude;
  let lat = position.data.coordinates.latitude;
  let apiKey = "32c4701d65b6ftd8c03oeb034a7b3869";
  let url = `${apiEndpoint}?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayData);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

getWeatherData("Melbourne");

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", getSearchedCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);
