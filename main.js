const options = document.getElementById("titles")
const films = []
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch('https://resource-ghibli-api.onrender.com/films')
    .then((response) => response.json())
    .then((films) => {
      bringMeAMovie(films)
    })
    let bringMeAMovie = films => {
    for (const movie of films) {
        let newOption = document.createElement("option")
       console.log(movie)
        newOption.textContent = movie.title
        newOption.value = movie.id
        options.append(newOption)
        }
    }
}