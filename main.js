let movieSelect = document.getElementById("movie-selector")
// let selected = movieSelect.value
// console.log(selected);
let submitButton = document.getElementById("comment-submit-button")
let review = document.getElementById("review")
let movieInfo = document.getElementById("movie-info")


// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch("https://resource-ghibli-api.onrender.com/films")
    .then(response => response.json())
    .then(data => {
        //console.log(response);
        dropdown(data)
    })
    .catch(err => console.error(err));
}


let movieList = [];

let dropdown = (movies => {
    
    for (const movie of movies) {
        movieList.push(movie)
        let selectMovie = document.createElement("option")
        selectMovie.setAttribute("value", `${movie.id}`)
        selectMovie.setAttribute("text", `${movie.title}`)
        selectMovie.textContent = movie.title
        selectMovie.value = movie.title
        movieSelect.append(selectMovie)
        // console.log(selectMovie);

    }

    
})

// let result = movieSelect.value
//  let infoHead = document.createElement("h3")
//  infoHead.innerText = result
// movieInfo.append(infoHead)

// let result = movieSelect.value
//     let  = find(name)
//     currentEpisode = episode


// let find = name => {
//     for (const el of movieList) {
//         if (el.name === name) {
//             return name
//         }
//     }
// }


 submitButton.addEventListener("click", event => {
    event.preventDefault()
    let ulLsit = document.createElement("ul")
    let comment = document.createElement("li")
    comment.innerHTML += `<strong>${movie.title}</strong>` + " : "
    comment.innerHTML += review.value
    ulLsit.append(comment)
    submitButton.append(ulLsit)
})


//show people//

let show = 

//reset button//

// let resetbutton = document.getElementById("reset-reviews")
// resetButton.addEventListener("click", event =>{
//     resetbutton.setAttribute("type", "reset")
// })






// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
