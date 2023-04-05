





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 const movieSelector = document.getElementById("movie-selector")
 const reviewInput = document.getElementById("review")
 const submitButton = document.getElementById("submit-button")
 const detailContainer = document.getElementById("movie-details")
 const showButton = document.getElementById("show-people")
 const resetReview = document.getElementById("reset-reviews")
 const reviewList = document.getElementById("review-list")
 const peopleSection = document.getElementById("ordered-list")

 fetch("https://resource-ghibli-api.onrender.com/films")
 .then(response => response.json())
 .then(response => {
     populateFormDropdown(response)
 })
 .catch(err => console.error(err));

 let movieList = []
 let currentMovie = null;
 
 let populateFormDropdown = movies => {
     let counter = 0
     for (const movie of movies) {
         counter += 1
         if (counter <= 22) {
             movieList.push(movie)
             let newOption = document.createElement("option")
             newOption.textContent = movie.title
             newOption.value = movie.title
             movieSelector.append(newOption)
         }
     }
 }


 movieSelector.addEventListener("click", event => {
    event.preventDefault()

    
    detailContainer.innerHTML = ""
    
    let movieName = movieSelector.value
    let movie = findMovieByName(movieName)
    currentMovie = movie
   

    let titleHeader = document.createElement("h3")
    titleHeader.textContent = movie.title
    detailContainer.append(titleHeader)

    let year = document.createElement("h3")
    year.textContent = movie.release_date
    detailContainer.append(year)

    let description = document.createElement("p")
    description.textContent = movie.description
    detailContainer.append(description)
})

let findMovieByName = name => {
    for (const movie of movieList) {
        if (movie.title === name) {
            return movie
        }
    }
}




 currentMovie = movieSelector.value

 submitButton.addEventListener("click", event => {
    event.preventDefault()
    let newReview = document.createElement("li")
    newReview.innerHTML += `<strong>${currentMovie.title}</strong>` + ": "
    newReview.innerHTML += reviewInput.value
    reviewList.append(newReview)
})



resetReview.addEventListener("click", event => {
    event.preventDefault()
    let element = document.getElementById("review-list")
    reviewList.remove()
})

 
showButton.addEventListener("click", event =>{
    event.preventDefault()
   //let people = movie.people
    let peopleList = document.createElement("list")
    peopleList.innerHTML += `<strong> ${currentMovie.people} </strong>`

    peopleSection.append(peopleList)
})




}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
