let searchForm = document.querySelector(".search-form");
console.log(searchForm);

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

searchForm.addEventListener("submit", searchSubmit);
