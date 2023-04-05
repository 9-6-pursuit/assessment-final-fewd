const titles = document.getElementById("titles")
const submitButton = document.getElementById("submit-button")
const detailContainer = document.getElementById("movie-detail-container")
const reviewButton = document.getElementById("review-submit-button")
const review = document.getElementById("review")
const reviewList = document.getElementById("review-list")


// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

fetch(`https://resource-ghibli-api.onrender.com/films`)
    .then(response => response.json())
    .then(response => {
    movieDropdown(response)
    console.log(response)
})



let movieList = []
let currentMovie = null

let movieDropdown = movies =>{
    for (let movie of movies){
        movieList.push(movie)
        let option = document.createElement("option")
        option.textContent = movie.title
        option.value = movie.title
        titles.append(option)
    }
}

function run() {
 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
