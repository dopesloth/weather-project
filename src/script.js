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

  getForecast(response.data.city);
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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "c8e21939ob5bfbb2ea332t339f450f8b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatForecastDay(day.time)}</div>
      <div class="weather-forecast-icon">
      <img
        src="${day.condition.icon_url}"
        alt=""
        class="forecast-icon"
      />
      </div>
      <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">${Math.round(
          day.temperature.maximum
        )}°</span>
        <span class="weather-forecast-temp-min"> | ${Math.round(
          day.temperature.minimum
        )}°</span>
      </div>
      </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Brooklyn");
