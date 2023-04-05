const titleSelector = document.getElementById('title')
const reviewSubmitButton = document.getElementById('review-submit-button')
const showPeople = document.getElementById('show-people')
const resetReviews = document.getElementById('reset-reviews')
const detailContainer = document.getElementById('film-detail-container')
const submitFilmSelector = document.getElementById('search')

fetch(`https://resource-ghibli-api.onrender.com/films`)
.then(response => response.json())
.then(response => {
populateFormDropDown(response)
})
.catch(err => console.error(err))

let filmList = []

let populateFormDropDown = films => {
    let counter = 0
    for (const film of films) {
        counter += 1
        filmList.push(film)
        let newOption = document.createElement("option")
        newOption.textContent = film.title
        newOption.value = film.title
        titleSelector.append(newOption)

    }
}

submitFilmSelector.addEventListener('click', event => {
    event.preventDefault()
    
    

    detailContainer.innerHTML = ''

    let filmName = titleSelector.title
    let film = findFilmByName(filmName)
    currentFilm = film

     let titleHeader = document.createElement('h3')
     titleHeader.textContent = film.title
     detailContainer.append(titleHeader)

     let description = document.createElement('p')
     description.textContent = film.description
     detailContainer.append(description)

})



// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
