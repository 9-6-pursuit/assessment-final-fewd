let moviesArray;
let film;
const selectElement = document.querySelector("#movies-dropdown");
const ul = document.querySelector("ul");
const ol = document.querySelector("ol");
const BASE_URL = "https://resource-ghibli-api.onrender.com/films";

// Fetch movies from API and add them to dropdown menu
fetch(BASE_URL)
  .then((response) => response.json())
  .then((movies) => {
    console.log(movies);
    moviesArray = movies;
    movies.forEach((movie, i) => {
      const option = document.createElement("option");
      option.innerText = movie.title;
      option.setAttribute("value", i);
      selectElement.append(option);
    });
  });

// Event listener for dropdown menu
selectElement.addEventListener("change", (event) => {
  event.preventDefault();
  // Clear movie details field before adding new elements
  document.querySelector("#display-info").innerHTML = "";
  // Populate movie details
  film = moviesArray[event.target.value];
  if (film) {
    const h3 = document.createElement("h3");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    h3.innerText = film.title;
    p1.innerText = film.release_date;
    p2.innerText = film.description;
    document.querySelector("#display-info").append(h3, p1, p2);
  }
});

// Event listener for form
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const review = document.querySelector("#review").value;
  const li = document.createElement("li");
  if (film) {
    li.innerHTML = `<strong>${film.title}</strong>: ${review}`;
    ul.append(li);
    // clear text input after adding
    document.querySelector("#review").value = "";
  } else {
    window.alert("Please select a movie first");
  }
});

// Event listener for reset button
const resetButton = document.querySelector("#reset-reviews");
resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  ul.innerHTML = "";
});

// Fetch people from API
let peopleArray;
let selectedMovieId;
fetch("https://resource-ghibli-api.onrender.com/people")
  .then((response) => response.json())
  .then((people) => {
    peopleArray = people;
    selectedMovieId = people.id;
  });

// Get People from Movie - add event listener
const peopleButton = document.querySelector("#show-people");
peopleButton.addEventListener("click", (event) => {
  event.preventDefault();
  //   console.log(film);
  // Reset list
  ol.innerHTML = "";

  // Loop through people array and check if people.films.includes(movie id), if so add name to list
  for (let person of peopleArray) {
    if (person.films.includes(selectedMovieId)) {
      const li = document.createElement("li");
      li.innerText = person.name;
      ol.append(li);
    }
  }
});
