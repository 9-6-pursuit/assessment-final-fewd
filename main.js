



// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

let form = document.querySelector("#review-form")
let reviewInput = document.querySelector("#review")
let ulReview = document.querySelector("#review-ul")
let resetButton = document.querySelector("#reset-reviews")
let showPeopleButton = document.querySelector("#show-people")
let currentMovie = null
let peopleUl = document.querySelector("#people-list")




showPeopleButton.addEventListener("click", fetchPeopleData)

function fetchPeopleData () {
 console.log(currentMovie)

 let dataArray = currentMovie.people

 let peopleArray = []

 dataArray.forEach((item) => {

    let id = item.split("/").pop()
   
    if (id) {
        peopleArray.push(id)
    } else {
        peopleUl.innerHTML = "<li> Sorry, this movie does not have characters.</li>"
    }
 })

 if(peopleArray.length > 0) {
    displayPeopleList(peopleArray)
 }
 
}

function displayPeopleList(data) {

    let fetchedPromisedNames = []

    let promiseArray = data.forEach(item => {
        fetchedPromisedNames
        .push(fetch(`https://resource-ghibli-api.onrender.com/people/${item}`).then
        (result => result.json()
            )
        )
    })

    Promise.all(fetchedPromisedNames)
    .then((result)=> {
        showListPeople(result)
    })
    .catch((error) => {
        console.log(error)
    })

    function showListPeople(data) {
        let characterNameArray = []

        data.forEach((item) => {
           characterNameArray.push(item.name)
        })

        characterNameArray.forEach(item => {
            let li = document.createElement("li")

            li.innerHTML = item
            peopleUl.append(li)
        })
    }

}

resetButton.addEventListener("click", function(event) {
    ulReview.innerHTML =""
})




form.addEventListener('submit', function(event) {
    event.preventDefault()

    let reviewInputValue = reviewInput.value

    if (!currentMovie) {
        alert ("please pick a movie.")
    } else if(reviewInputValue.length === 0) {
        alert("please leave a review")
    } else {
        
        
        let reviewLi = document.createElement("li")
        
        reviewLi.innerHTML = `<strong>${currentMovie.title}</strong> ${reviewInputValue}`
        
        ulReview.append(reviewLi)
        
        reviewInputValue = ""
    }

})


function displayInfo(data){
    let info = document.querySelector("#display-info")

    info.innerHTML = ""

    let headerThree = document.createElement("h3")
    let firstP = document.createElement("p")
    let secondP = document.createElement("p")

    headerThree.innerText = data.title;
    firstP.innerText = data.release_date;
    secondP.innerText = data.description;

    info.append(headerThree, firstP, secondP)

}


function getSingleMovieInfo(id) {
    let url = `https://resource-ghibli-api.onrender.com/films/${id}`


    fetch(url)
    .then ((response) => response.json())
    .then((json) => {
    
    peopleUl.innerHTML = "";
    currentMovie = json;
    displayInfo(json);
})
}



function getMovieInfo (event) {

    getSingleMovieInfo(event.target.value)
}
  


function run() {
    let url = 'https://resource-ghibli-api.onrender.com/films'


    fetch(url)
    .then ((response) => response.json())
    .then((json) => {
    
    
    let movieOptions = document.querySelector("#titles")

    movieOptions.addEventListener("change", getMovieInfo)

    json.forEach(({title, id}) => {
        let option = document.createElement("option")
        option.value = id;
        option.textContent = title;

        movieOptions.append(option)
    })
})
}

 


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
