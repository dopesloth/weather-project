function refreshTemp(response) {
  let temperatureElement = document.querySelector("#temp-now");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector(".current-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = Math.round(windSpeed * 100 * 0.621371) / 100 + " mph";
  temperatureElement.innerHTML =
    Math.round(response.data.temperature.current) + "°F";
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  console.log(response.condition.icon_url);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day}, ${hours}:${minute}`;
}

function searchCity(city) {
  let apiKey = "c8e21939ob5bfbb2ea332t339f450f8b";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=imperial`;
  axios.get(apiURL).then(refreshTemp);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Paris");
