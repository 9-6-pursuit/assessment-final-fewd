// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  const ghibliFilms = "https://resource-ghibli-api.onrender.com/films";

  fetch(ghibliFilms)
    .then((response) => response.json())
    .then((films) => {
      console.log(films);

      // Add movie titles to select menu.

      const titles = document.getElementById("titles");

      for (let i = 0; i < films.length; i++) {
        const option = document.createElement("option");
        const { id, title, release_date, description } = films[i];
        option.value = id;
        option.textContent = title;
        titles.append(option);

        // Change movie description when a movie is selected.

        titles.addEventListener("change", (event) => {
          event.preventDefault();

          const displayInfo = document.getElementById("display-info");

          const displayTitle = document.createElement("h3");
          displayTitle.textContent = title;

          const releaseYear = document.createElement("p");
          releaseYear.textContent = release_date;

          const movieDescription = document.createElement("p");
          movieDescription.textContent = description;

          displayInfo.append(displayTitle, releaseYear, movieDescription);
        });

        // Show people when button is clicked.

        const showPeople = document.getElementById("show-people");

        showPeople.addEventListener("click", (event) => {
          event.preventDefault();
        });
      }
      // Add reviews.

      const form = document.querySelector("form");

      const ul = document.querySelector("section ul");

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        // If no movie selected, error submitting review

        // if (!films.length) {
        //   alert("Please select a film.");
        // } else {
        const reviewInput = event.target.review;
        const li = document.createElement("li");
        li.innerHTML =
          `<strong>Movie Title:</strong> ` + `${reviewInput.value}`;
        ul.append(li);
        form.reset();
        // }

        // Reset Reviews

        const resetReviews = document.getElementById("reset-reviews");

        resetReviews.addEventListener("click", (event) => {
          event.preventDefault();
          const allReviews = document.querySelector("main section ul li");
          allReviews.remove();
        });
      });
    });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
