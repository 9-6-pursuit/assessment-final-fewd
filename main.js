let movieSelect = document.getElementById("movie-selector")
let displayInfo = document.getElementById("display-info")
let submitButton = document.getElementById("comment-submit-button")
let review = document.getElementById("review")
let addReview = document.querySelector("#reviews ul")
let reset = document.getElementById("reset-reviews")
let showButton = document.getElementById("show-people")
let people = document.getElementById("people")
let addPeople = document.querySelector("#people li")



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


let movieList = []


let dropdown = (movies => {
    movieList = movies
    for (const movie of movies) {
      
        let selectMovie = document.createElement("option")
        selectMovie.textContent = movie.title
        selectMovie.value = movie.title
        
        movieSelect.append(selectMovie)
        // console.log(selectMovie);

    }

    
})
//creates drp-down empty//
let emptyOption = document.createElement("option")
movieSelect.prepend(emptyOption)


//adding description of the selected option//

movieSelect.addEventListener("change", event => {
    // console.log(event.target);
   
    let addHeader = document.createElement("h3")
    addHeader.innerText = movieSelect.value
    displayInfo.append(addHeader)

    let date = document.createElement("p")
    let selected = findItem(movieSelect.value)
    date.innerText = selected.release_date
    displayInfo.append(date)

    let description = document.createElement("p")
    description.innerText = selected.description
    displayInfo.append(description)
    
})

function findItem(name) {
    for (const movie of movieList) {
        if (movie.title === name){
            return movie
        }
    }
}

//review button//
submitButton.addEventListener("click", event => {
    event.preventDefault()
    
    if (!movieSelect.value){
      alert("Please select a movie first")  
    }
    let selectedMovie = findItem(movieSelect.value)
    let comment = document.createElement("li")
    

    comment.innerHTML += `<strong>${selectedMovie.title}</strong>` + " -- "
    comment.innerHTML += review.value
    addReview.append(comment)
    review.value = ""
})

// reset button//

reset.addEventListener("click", event => {
    addReview.innerHTML = ""
})


//people//
fetch("https://resource-ghibli-api.onrender.com/people")
    .then(response => response.json())
    .then(data => {
        console.log(data);
       
    })
    .catch(err => console.error(err));

    showButton.addEventListener("click", event => {
        event.preventDefault()

        let selectedMovie = findItem(movieSelect.value)
        addPeople.innerText = eachName(selectedMovie.people)
        people.append(addPeople)



    })

    function eachName(name){
        for (const el of name) {
            return el
        }
    }




// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
