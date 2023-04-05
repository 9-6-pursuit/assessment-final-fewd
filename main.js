




// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

const selector = document.getElementById('titles')
const displayInfo = document.getElementById('display-info')
const reviewForm = document.getElementById("movie-review-form")
const listOfReviews = document.getElementById('submittedReviews')
const listOfPeople = document.getElementById('listOfPeople')

let baseUrl ='https://resource-ghibli-api.onrender.com/films'

fetch(baseUrl)
.then(response => response.json())
.then (response => {
    fillOptionTag(response)
})



let fillOptionTag = movies =>{
    for(const movie of movies){
        let newOption = document.createElement("option")
        newOption.textContent = movie.title
        newOption.value = movie.id
        selector.append(newOption)
    }
}

selector.addEventListener('change', event =>{
    event.preventDefault()
    // test.innerHTML = ""
    movieId = selector.value
    fetch(`https://resource-ghibli-api.onrender.com/films/${movieId}`)
    .then(response => response.json())
    .then(response => {
        getMovieDesc(response)
    })
})

let getMovieDesc = movie =>{
    displayInfo.innerHTML=""
    h3 = document.createElement("h3")
    h3.setAttribute('id', 'movie-title')
    p1 = document.createElement('p')
    p2 = document.createElement('p')

    h3.textContent = movie.title
    h = "movie-title"
    p1.textContent = movie.release_date
    p2.textContent = movie.description

    displayInfo.append(h3,p1,p2)
}


reviewForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    if(!selector.value){
        alert("Please select a movie first");
        return
    }

    const reviewSubmission  = event.target.review.value

    const li = document.createElement('li')
    const movieTitle = document.querySelector('#movie-title')


    li.innerHTML=`
    <strong>${movieTitle.textContent}</strong>: ${reviewSubmission}
    `

    listOfReviews.append(li)

})

resetButton = document.getElementById('reset-reviews')

resetButton.addEventListener('click', () =>{
    listOfReviews.innerHTML = ' ';
})


showPeople = document.getElementById('show-people')

showPeople.addEventListener('click', () =>{
    movieId = selector.value
    fetch(`https://resource-ghibli-api.onrender.com/people`)
    .then(response => response.json())
    .then(response => {
        peopleFiller(response, movieId)
    })
})

function peopleFiller(json, movieId){

    json.forEach(person => {
        let li = document.createElement('li')
        if(person.films[0] == `/films/${movieId}`){
            li.textContent = person.name
            listOfPeople.append(li)
        }
    });

   
}



}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
