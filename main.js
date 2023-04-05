const url = "https://resource-ghibli-api.onrender.com/films"

const review = document.querySelector("form")
console.log(review)

review.addEventListener("submit", (event) => {
    event.preventDefault()
})

const filmz = document.querySelector("#films")
console.log(filmz)

// const titleSelections = document.createAttribute
const movieSelector = document.querySelector("#movie-selector")


fetch(url)
.then((response) => response.json())
.then((films) => {
    // console.log(films)
    for (const film of films) {
        const newOption = document.createElement("option")
        newOption.textContent = film.title
        newOption.value = film.title
        movieSelector.append(newOption)
    }
})