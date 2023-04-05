let movieListing = []
let movieSelector = document.getElementById('titles');
let selectButton = document.getElementById('select')
let movieDetails = document.getElementById('movie-details');





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 let Response=null;
fetch(`https://resource-ghibli-api.onrender.com/films/`)
  .then(response => response.json())
  .then(response => {
    createMovieDropDown(response)
})
.catch(err => console.error(err));

  
}

const createMovieDropDown = (movies) => {
  console.log(movies)
  let counter = 0
  for (const movie of movies) {
      counter += 1
      if (counter <= 20) {
        movieListing.push(movie)
          let newOption = document.createElement("option")
          newOption.textContent = movie.title
          newOption.value = movie.title
          movieSelector.append(newOption)
      }
  }
}

selectButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('button clicked!')
  let selectedMovie = movieSelector.value
  
})


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
