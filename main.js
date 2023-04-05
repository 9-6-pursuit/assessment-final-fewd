// selecting the section tag where the titles will be inputed
let selectMovie = document.getElementById("titles")
// Creating h3, p, and p tag which will be filled with info when movie is selected
let movieTitle = document.createElement("h3")
let movieYear = document.createElement("p")
let movieDetails = document.createElement("p")
let movieDecription = document.getElementById("display-info")
// array of movies
let studioGhibilMovies = []
// Review of movies
let movieReview = document.querySelector("form")
let inputedReview = document.getElementById("review")
let reviewList = document.querySelector("ul")
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
function run() {
    fetch(`https://resource-ghibli-api.onrender.com/films`)
        .then((response) => response.json())
        .then((json) => {
            title(json)
        })
        .catch((error) => {
            console.log(error);
        })

    const title = (json) => {

        json.forEach(element => {
            studioGhibilMovies.push(element)
        let optionMovie = document.createElement("option")
            optionMovie.value = element.title
            optionMovie.textContent = element.title
        selectMovie.append(optionMovie)
        });

        selectMovie.addEventListener("change", event => {
            studioGhibilMovies.forEach(ele => {
                if(ele.title === event.target.value){
                    console.log(ele)
                    movieTitle.textContent = ele.title
                    movieYear.textContent = ele.release_date
                    movieDetails.textContent = ele.description
                    movieDecription.append(movieTitle)
                    movieDecription.append(movieYear)
                    movieDecription.append(movieDetails)
                }
            })
        })
        movieReview.addEventListener("submit", event => {
            event.preventDefault()
            console.log(selectMovie.value)
            console.log(event.target.review.value)
            console.log(inputedReview.value)
            studioGhibilMovies.forEach(ele => {
                if(ele.title === selectMovie.value){
                    let reviewItem = document.createElement("li")
                    reviewItem.innerHTML = `<strong>${selectMovie.value}:</strong> ${inputedReview.value}`
                    reviewList.append(reviewItem)
                }
            })
            event.target.review.value = ""
        })
    }
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
