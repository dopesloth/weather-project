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

function getForecast(city) {
  let apiKey = "c8e21939ob5bfbb2ea332t339f450f8b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
      <div class="weather-forecast-icon">
      <img
        src="data:image/png;base64,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"
        alt=""
        width="36px"
        class="forecast-icon"
      />
      </div>
      <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">18°</span>
        <span class="weather-forecast-temp-min"> | 12°</span>
      </div>
      </div>
      `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Brooklyn");
displayForecast();
