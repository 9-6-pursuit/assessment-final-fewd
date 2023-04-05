// selecting the section tag where the titles will be inputed
let selectMovie = document.getElementById("titles")
// Creating h3, p, and p tag which will be filled with info when movie is selected
let movieTitle = document.createElement("h3")
let movieYear = document.createElement("p")
let movieDetails = document.createElement("p")
let movieDecription = document.getElementById("display-info")
// array of movies
let studioGhibilMovies = []
// Review of movies
let movieReview = document.querySelector("form")
let inputedReview = document.getElementById("review")
let reviewList = document.querySelector("ul")
// Reset Review 
let resetReview = document.getElementById("reset-reviews")
// ordered list shows all people who worked on the movie 
let orderedList = document.getElementById("show-people")
let orderedListItem = document.querySelector("ol")
// a count to make suer the review doenst not wokr until a movie is picked 
let count = 0
let countTwo = 0
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
function run() {
    // Fecthing the studio Ghibil API
    fetch(`https://resource-ghibli-api.onrender.com/films`)
        .then((response) => response.json())
        .then((json) => {
            title(json)
        })
        .catch((error) => {
            console.log(error);
        })
// the function that the above fetch is calling with the API as a parameter
    const title = (json) => {
// the movie details that is being inputed into the H3,p, and p tags
        json.forEach(element => {
            studioGhibilMovies.push(element)
        let optionMovie = document.createElement("option")
            optionMovie.value = element.title
            optionMovie.textContent = element.title
        selectMovie.append(optionMovie)
        });
// the dropdown menu bar which will trigger the above code 
        selectMovie.addEventListener("change", event => {
            count++
            studioGhibilMovies.forEach(ele => {
                if(ele.title === event.target.value){
                    console.log(ele)
                    movieTitle.textContent = ele.title
                    movieYear.textContent = ele.release_date
                    movieDetails.textContent = ele.description
                    movieDecription.append(movieTitle)
                    movieDecription.append(movieYear)
                    movieDecription.append(movieDetails)
                }
            })
            orderedListItem.innerHTML = ""
            countTwo = 0
        })
        // Creating the reviews for the selected movie and which will not dissappear unless the reset button is pressed 
        movieReview.addEventListener("submit", event => {
            event.preventDefault()
            console.log(count)
            if (count >= 1){
                studioGhibilMovies.forEach(ele => {
                    if(ele.title === selectMovie.value){
                        let reviewItem = document.createElement("li")
                        reviewItem.innerHTML = `<strong>${selectMovie.value}:</strong> ${inputedReview.value}`
                        reviewList.append(reviewItem)
                    }
                })
            }

            event.target.review.value = ""
        })
        // when the below button is pressed, all the reviews submitted will dissappear 
        resetReview.addEventListener("click", event => {
            reviewList.innerHTML = ""
        })
        // when the show people button is pressed then the all the people within the movie api will be inputed into the ordered list 
        orderedList.addEventListener("click", event => {
            countTwo++
            studioGhibilMovies.forEach(ele => {
                // makes sure the code is not triggered more than once and will reset after the change event listener is triggered 
                if(ele.title === selectMovie.value){
                    if (countTwo <= 1){
                        if(ele.people.includes('/people/')){
                            let item = document.createElement("li")
                            item.textContent = `No people found in the API`
                            orderedListItem.append(item)
                           } else {
                            ele.people.forEach(ele => {
                                // loops through the people array found within the movie api and fecth the api for each person. The names will then populate the ordered list
                                fetch(`https://resource-ghibli-api.onrender.com${ele}`)
                                .then((response) => response.json())
                                .then((json) => {
                                    console.log(json)
                                    let item = document.createElement("li")
                                    item.textContent = `${json.name}`
                                    orderedListItem.append(item)
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
            
                            })                    
                           }
                    }


                }
            })
            
        })
    }
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
