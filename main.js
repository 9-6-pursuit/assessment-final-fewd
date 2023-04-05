// const filmSelector = document.getElementById("film-selector")
// const submitButton = document.getElementById("submit-button")
// const detailContainer = document.getElementById("film-detail-container")
// const commentButton = document.getElementById("comment-submit-button")
// const commentInput = document.getElementById("comment-input")
// const commentList = document.getElementById("comment-list")





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {

    fetch(`https://resource-ghibli-api.onrender.com/films`)
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
    .catch(err => console.error(err));

    let filmList = []
    let currentFilm = null;

    let populateFormDropdown = films => {
        let counter = 0
        for (const film of films) {
            counter += 1
            if (counter <= 23) {
                filmList.push(film)
                let newOption = document.createElement("option")
                newOption.textContent = films.title
                newOption.value = films.title
                filmSelector.append(newOption)
            }
        }
    }

    submitButton.addEventListener("click", event => {
        event.preventDefault()


        detailContainer.innerHTML = ""

        let filmName = movieSelector.value
        let film = findFilmByName(filmName)
        currentFilm = film

        let titleHeader = document.createElement("h3")
        titleHeader.textContent = episode.name
        detailContainer.append(titleHeader)

        let description = document.createElement("p")
        description.textContent = episode.description
        detailContainer.append(description)
    })

    let findFilmByName = name => {
        for (const film of filmList) {
            if (film.name === name) {
                return film
            }
        }
    }

    commentButton.addEventListener("click", event => {
        event.preventDefault()
        let newComment = document.createElement("li")
        newComment.innerHTML += `<strong>${currentFilm.name}</strong>` + " -- "
        newComment.innerHTML += commentInput.value
        commentList.append(newComment)
    })
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
