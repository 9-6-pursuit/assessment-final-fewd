// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  fetch(`https://resource-ghibli-api.onrender.com/films`)
    .then((response) => response.json())
    .then((response) => {
      populateFormDropdown(response);
    })
    .catch((err) => console.error(err));
}

const movieSelector = document.getElementById("movie-selector");
const movieSubmitButton = document.getElementById("movie-submit-button");
const detailContainer = document.getElementById("display-info");
const commentButton = document.getElementById("comment-submit-button");
const commentInput = document.getElementById("comment-input");
const commentList = document.getElementById("comment-list");

let movieList = [];
let currentMovie = null;

let populateFormDropdown = (movies) => {
  for (const movie of movies) {
    console.log(movie);
    movieList.push(movie);
    let newOption = document.createElement("option");
    newOption.textContent = movie.title;
    newOption.value = movie.title;
    movieSelector.append(newOption);
  }
};

movieSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();

  detailContainer.innerHTML = "";

  let movieName = movieSelector.value;
  let movie = findMovieByName(movieName);
  currentMovie = movie;

  let titleHeader = document.createElement("h3");
  titleHeader.textContent = movie.title;
  detailContainer.append(titleHeader);

  let releaseDate = document.createElement("p");
  releaseDate.textContent = movie.release_date;
  detailContainer.append(releaseDate);

  let description = document.createElement("p");
  description.textContent = movie.description;
  detailContainer.append(description);
});

let findMovieByName = (name) => {
  for (const movie of movieList) {
    if (movie.title === name) {
      return movie;
    }
  }
};

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
