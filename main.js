const baseURL = 'https://resource-ghibli-api.onrender.com';
const filmURL = `${baseURL}/films/`;
const peopleURL = `${baseURL}`;

const movieDropdown = document.querySelector('.movie-titles select');
const yourReview = document.querySelector('.enter-review form');
const movieDetails = document.querySelector('.movie-details div');
const people = document.querySelector('.people ol');
const movieAppend = document.querySelector('#show-people');
const movieReview = document.querySelector('#reviews ul');
const movieReviewReset = document.querySelector('#reset-reviews');
const movieImage = document.querySelector('.movie-img');

function getMovieTitles(movies) {
    for (let movie of movies) {
        let newMovieOption = document.createElement('option');
        newMovieOption.value = movie.id;
        newMovieOption.innerText = movie.title;
        movieDropdown.append(newMovieOption);
    }
};




// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

    // FETCH
    fetch(filmURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            getMovieTitles(data);
        }); 
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

//Select id titles: starts with one option (blank, no value), remaining options will be populated with the movie titles from the API 

movieDropdown.addEventListener('change', (event) => {
    event.preventDefault();
    console.log(movieDropdown.value)

    movieDetails.innerHTML = '';
    people.innerHTML = '';
    let movieTitle = document.createElement('h3');
    let movieYear = document.createElement('p');
    let movieDetail = document.createElement('p');

    if (movieDropdown.value) {
        fetch(`${filmURL}${movieDropdown.value}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                movieTitle.innerText = data.title;
                movieImage.src = data.image;
                movieImage.alt = `${data.title} poster`;
                movieImage.style.display = 'block';
                movieYear.innerText = data.release_date;
                movieDetail.innerText = data.description;

                movieDetails.append(movieTitle, movieYear, movieDetail);
            });
    } else {
        alert('Please select a movie first');
        console.log(alert('Please select a movie first'));
    };

});