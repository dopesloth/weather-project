function refreshTemp(response) {
  let newTemperature = document.querySelector("#temp-now");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  newTemperature.innerHTML =
    Math.round(response.data.temperature.current) + "°F";
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
