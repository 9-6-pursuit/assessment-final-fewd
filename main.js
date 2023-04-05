let filmUrl = "https://resource-ghibli-api.onrender.com/films"
let peopleUrl = "https://resource-ghibli-api.onrender.com"
let movieSelector =document.getElementById(`movieTitleSelector`)
let reviewButton = document.getElementById(`review:`)
let displayInfoContainer = document.getElementById(`display-info`)
let commentButton = document.getElementById(`submit-comment`)
let commentInput = document.getElementById('review')
let commentList = document.getElementById('comment-list')
let resetButton = document.getElementById('reset-reviews')
let showPeopleButton = document.getElementById(`show-people`)




// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch(filmUrl)
    .then(response => response.json())
    .then(response => {
        // console.log(response)
        populateFormDropdown(response)
    })
    .catch(err => console.error(err))
 // Add code you want to run on page load here
}



let movieList = []
let currentMovie = null;
let currentMoviePeople = []

let populateFormDropdown = titles => {
    counter = 0
    for (const title of titles) {
        counter +=1 
        if (counter < 13) {
            movieList.push(title)
            // console.log(title)
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
    // console.log(movieSelector.value)
    
    let movie = findMovieByValue(movieValue)
    currentMovie = movie
    console.log(currentMovie)
    if (currentMovie.people) {
        currentMoviePeople = currentMovie.people
    } else {
        console.log(`no people in this movie`)
    }

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
            // console.log(movie)
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

resetButton.addEventListener("click", event => {
    event.preventDefault()
    commentList.textContent = ""
})

let peopleUrlArray = []
let peopleSection = document.getElementById(`people-section`)
peopleSection.textContent = ""

showPeopleButton.addEventListener("click", event => {
    event.preventDefault()
    let person
    
    for (const people of currentMoviePeople) {
        person = ""
        person = people
        let newPersonUrl = `${peopleUrl}` + `${person}`
        peopleUrlArray.push(newPersonUrl)
        // console.log(newPersonUrl)
        // console.log(peopleUrlArray)
    }
    
    for (let i = 0; i < peopleUrlArray.length; i++) {
        // console.log([i])
        fetch(peopleUrlArray[i])
        .then(response => response.json())
        .then(response => {
        populatePeople(response)
        })
    }
})

    

let populatePeople = person => {
    let newPerson = document.createElement('li')
    newPerson.textContent = person.name
    peopleSection.append(newPerson)

    // for (let i = 0; i < peopleArray.length; i++) {
    //     
    //     
    //     
    // }
    
}
    // for (let i = 0; i < currentMovie.people.length; i++) {
    //     let newPerson = document.createElement('li')
    //     peopleSection.append(newPerson)
    // }
    // }
    // counter = 0
    // for (const title of titles) {
    //     counter +=1 
    //     if (counter < 13) {
    //         movieList.push(title)
    //         console.log(title)
    //         let newOption = document.createElement(`option`)
    //         newOption.textContent = title.title
    //         newOption.value = title.id
    //         movieSelector.append(newOption)
    //     }
    // }







// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
