// // const movieSelector = document.getElementById("selector")
// // const submitButton = document.getElementById("submit-button")
// // const detailContainer = document.getElementById("display-info")
// // const reviewButton = document.getElementById("submit-button")
// // const reviewInput = document.getElementById("review")
// // const reviewList = document.getElementById("review-list")

// // let movieList = []
// // let currentMovie = null

// // let movieList = []
// // let currentMovie = null
// // To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

// function run() {

//     const movieSelector = document.getElementById('titles')
//     const displayInfo = document.getElementById('display-info')
//     const reviewForm = document.getElementById("movie-review-form")
//     const listOfReviews = document.getElementById('submittedReviews')
//     const listOfPeople = document.getElementById('listOfPeople')

// let baseUrl = "https://resource-ghibli-api.onrender.com/films"

//  // Add code you want to run on page load here
//  fetch(baseUrl)
// .then(response => response.json())
// .then(response => {
//     fillOption(response)
// })

// let fillOption = movies =>{
//     for(const movie of movies){
//         let newOption = document.createElement("option")
//         newOption.textContent = movie.title
//         newOption.value = movie.id
//         movieSelector.append(newOption)
//     }
// }
// movieSelector.addEventListener('change', event =>{
//     event.preventDefault()
//     // test.innerHTML = ""
//     movieId = movieSelector.value
//     fetch(`https://resource-ghibli-api.onrender.com/films/${movieId}`)
//     .then(response => response.json())
//     .then(response => {
//         getMovieDesc(response)
//     })
// })

// let getMovieDesc = movie =>{
//     displayInfo.innerHTML=""
//     h3 = document.createElement("h3")
//     h3.setAttribute('id', 'movie-title')
//     p1 = document.createElement('p')
//     p2 = document.createElement('p')
//     h3.textContent = movie.title
//     h = "movie-title"
//     p1.textContent = movie.release_date
//     p2.textContent = movie.description
//     displayInfo.append(h3,p1,p2)
// }
// }


// let populateMovie = movies => {
//     for (const movie of movies) {
//         movieList.push(movie)
//         let newOption = document.createElement("option")
//         newOption.textContent = movie.title
//         newOption.value = movie.id
//         movieSelector.append(newOption)
//         }
//     }

// submitButton.addEventListener("click", event => {
//     event.preventDefault()

//     detailContainer.innerHTML = ""

//     let movieName = movieSelector.value
//     let movie = findMovieByName(movieName)
//     currentMovie = movie

    
//     let titleHeader = document.createElement("h3")
//     titleHeader.textContent = movie.title
//     detailContainer.append(titleHeader)

//     let releaseDate = document.createElement("p")
//     releaseDate.textContent = movie.release_date
//     detailContainer.append(releaseDate)

//     let description = document.createElement("p")
//     description.textContent = movie.description
//     detailContainer.append(description)
// })

// let findMovieByName = title => {
//     for (const movie of movieList) {
//         if (movie.title === title){
//             return movie
//         }
//     }
// }

// reviewButton.addEventListener("click", event => {
//     event.preventDefault()
//     let newReview = document.createElement("li")
//     newReview.innerHTML += currentMovie.title
//     newReview.innerHTML += reviewInput.value
//     reviewList.append(newReview)
// })

// // This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// // So that testing can work as expected for now
// // A non-hacky solution is being researched

// setTimeout(run, 1000);


// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    // Add code you want to run on page load here
   
   const movieSelector = document.getElementById('titles')
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
           movieSelector.append(newOption)
       }
   }
   
   movieSelector.addEventListener('change', event =>{
       event.preventDefault()
       // test.innerHTML = ""
       movieId = movieSelector.value
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
   
       if(!movieSelector.value){
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
       console.log(movieId)
       let li = document.createElement('li')
   
       json.forEach(person => {
           console.log(person.films[0])
           if(person.films[0] == `/films/${movieId}`){
               li.textContent = person.name
               listOfPeople.append(li)
           }
       });
   
       console.log(json)   
   }
   
   
   
   }
   
   // This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
   // So that testing can work as expected for now
   // A non-hacky solution is being researched
   setTimeout(run, 1000);