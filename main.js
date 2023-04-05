let filmUrl = "https://resource-ghibli-api.onrender.com/films"
let peopleUrl = "https://resource-ghibli-api.onrender.com/people"
let movieSelector =document.getElementById(`movieTitleSelector`)
let reviewButton = document.getElementById(`review:`)
let displayInfoContainer = document.getElementById(`display-info`)
let commentButton = document.getElementById(`submit-comment`)
let commentInput = document.getElementById('comment-input')
let commentList = document.getElementById('comment-list')




// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch(filmUrl)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        populateFormDropdown(response)
    })
    .catch(err => console.error(err))
 // Add code you want to run on page load here
}



let movieList = []
let currentMovie = null;

let populateFormDropdown = titles => {
    counter = 0
    for (const title of titles) {
        counter +=1 
        if (counter < 13) {
            movieList.push(title)
            console.log(title)
            let newOption = document.createElement(`option`)
            newOption.textContent = title.title
            newOption.value = title.id
            movieSelector.append(newOption)
        }
    }
}

movieSelector.addEventListener(`click`, event => {
    event.preventDefault()

    displayInfoContainer.innerHTML = ""

    let movieValue = movieSelector.value
    console.log(movieSelector.value)
    let movie = findMovieByValue(movieValue)
    currentMovie = movie

    let titleHeader = document.createElement(`h3`)
    titleHeader.textContent = currentMovie.title
    displayInfoContainer.append(titleHeader)
    
    let releaseYear = document.createElement(`p`)
    releaseYear.textContent = currentMovie.release_date
    displayInfoContainer.append(releaseYear)

    let description = document.createElement(`p`)
    description.textContent = currentMovie.description
    displayInfoContainer.append(description)
})



let findMovieByValue = value => {
    for (const movie of movieList) {
        if (movie.id === value) {
            console.log(movie)
            return movie
        }
    }
}

commentButton.addEventListener("click", event => {
    event.preventDefault()
    if (movieSelector.value === "") {
        alert ("Please select a movie first")
    } else {
    let newComment = document.createElement("li")
    newComment.innerHTML += `<strong>${currentMovie.title}</strong>` + " -- "
    newComment.innerHTML += commentInput.value
    commentList.append(newComment)
    }
})









// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
