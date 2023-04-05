// Select the relevant elements from the DOM
const moviesDropdown = document.getElementById("movies-dropdown");
const displayInfo = document.getElementById("display-info");
const reviewsList = document.querySelector("#reviews ul");
const resetReviewsBtn = document.getElementById("reset-reviews");
const showPeopleBtn = document.getElementById("show-people");
const form = document.querySelector("form");

// Fetch data from the API and populate the dropdown menu
fetch("https://resource-ghibli-api.onrender.com/films")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((movie) => {
      const option = document.createElement("option");
      option.value = movie.id;
      option.text = movie.title;
      moviesDropdown.appendChild(option);
    });
  });

// Add an event listener to the dropdown menu
moviesDropdown.addEventListener("change", (event) => {
  const movieId = event.target.value;
  if (movieId) {
    // Fetch the movie data from the API
    fetch(`https://resource-ghibli-api.onrender.com/films/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        // Populate the display-info div with the movie details
        displayInfo.innerHTML = `
          <h3>${data.title}</h3>
          <p>Released: ${data.release_date}</p>
          <p>${data.description}</p>
        `;
      });
    peopleList.innerHTML = "";
  }
});

// Add an event listener to the form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const movieTitle = moviesDropdown.options[moviesDropdown.selectedIndex].text;
  const review = document.getElementById("review").value;

  if (!movieTitle) {
    alert("Please select a movie first");
    return;
  }

  // Create a new li element for the review and append it to the reviews list
  const li = document.createElement("li");
  li.innerHTML = `<strong>${movieTitle}</strong>: ${review}`;
  reviewsList.appendChild(li);
  // Reset the form
  form.reset();
});

// Add an event listener to the reset button
resetReviewsBtn.addEventListener("click", () => {
  // Remove all the li elements from the reviews list ul
  const reviewsList = document.querySelector("#reviews ul");
  while (reviewsList.firstChild) {
    reviewsList.removeChild(reviewsList.firstChild);
  }
});

let movies = [];

// Fetch the list of movies
fetch("https://resource-ghibli-api.onrender.com/films")
.then((response) => response.json())
.then((data) => {
  movies = data;
});

// Add an event listener to the show people button
  showPeopleBtn.addEventListener("click", () => {
    const movieId = moviesDropdown.value;
    console.log(movieId);
    // Find the selected movie
    const selectedMovie = movies.find((movie) => movie.id === movieId);
    // Fetch the list of people in the selected movie
    fetch(`https://resource-ghibli-api.onrender.com/films/${movieId}/people`)
      .then((response) => response.json())
      .then((data) => {
        // Clear the previous people from the list
        peopleList.innerHTML = "";
        // Populate the people list with the names of the characters in the selected movie
        data.forEach((character) => {
          console.log(character);
          // Check if the character is in the selected movie
          if (character.films.includes(selectedMovie.url)) {
            const li = document.createElement("li");
            li.textContent = character.name;
            peopleList.appendChild(li);
          }
        });
      });
  });


