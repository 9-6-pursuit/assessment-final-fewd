
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 console.log('hello')
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

//DOM Element References
const movieSelector = document.getElementById("titles");
const movieInfo = document.getElementById("display-info");

//FETCH REQUEST
fetch('https://resource-ghibli-api.onrender.com/films')
.then(response => response.json())
.then(data =>  {
    populateOptions(data);
})
.catch(error => console.log(error));

const populateOptions = (movies) => {
    for (movie of movies) {
        let newOption = document.createElement('option')
        newOption.textContent = movie.title;
        newOption.value = movie.id;
        movieSelector.append(newOption);
    }
}

const movieDescription = (movies) => movieSelector.addEventListener('change', event => {
    let movieTitle = document.createElement('h3');
    movieTitle.textContent = 
})