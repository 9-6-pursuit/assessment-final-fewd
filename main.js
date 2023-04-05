
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 console.log('hello')
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

//DOM Element References
const movieSelector = document.getElementById("titles");
const movieInfo = document.getElementById("display-info");
const reviewButton = document.getElementById('submit-review');
const reviewInput = document.getElementById('review');
const reviewSection = document.getElementsByClassName('review-list');
const resetReviewButton = document.getElementById("reset-reviews");
const showPeople = document.getElementById('show-people');
const peopleList = document.querySelector('.people-list');

console.log(peopleList);


//FETCH REQUEST1
fetch('https://resource-ghibli-api.onrender.com/films')
.then(response => response.json())
.then(data =>  { console.log(data);
    populateOptions(data);
})
.catch(error => console.log(error));


let strongTitle = ''//I'll use this for the "Add a review section"

const populateOptions = (movies) => {
    //this populates the options list
    for (movie of movies) {
        let newOption = document.createElement('option')
        newOption.textContent = movie.title;
        newOption.value = movie.id;
        movieSelector.append(newOption);
    }
    //this add the selected movie's title and information
   movieSelector.addEventListener('change', event => {
        const selectedMovieId = event.target.value;
        //if I just did event.target upon selecting on a movie in the movie selector it will return the whole innerHTML content for the dropdown - in other words it will get all the option tags of movies
        console.log(selectedMovieId);//logs movie id because that is the value for this option

        //There must be a second fetch request... because HOW??????
        const getPeopleByFilmId = (peopleData) => {
            movieId = `/films/${selectedMovieId}`; 
            console.log(peopleData)
            peopleData.forEach(person => {
                    if(person.films.includes(movieId)) {
                        let personInMovie = document.createElement('li');
                        personInMovie.textContent = person.name;
                        peopleList.append(personInMovie);
                    }
              });
        } 
        showPeople.addEventListener('click', event => {
            event.preventDefault();
            fetch('https://resource-ghibli-api.onrender.com/people')
            .then(response => response.json())
            .then(peopleData =>  {;
                getPeopleByFilmId(peopleData);
            })
            .catch(error => console.log(error));
        })
           

        for (movie of movies) {
            if(selectedMovieId === movie.id) {
                let movieTitle = document.createElement('h3');
                movieTitle.classList.add('heading')
                movieTitle.textContent = movie.title;

                let movieDescription = document.createElement('p');
                movieDescription.classList.add('previous-p')
                movieDescription.textContent = movie.description;

                movieInfo.append(movieTitle);
                movieInfo.append(movieDescription);

                //code to replace movie title and description to new selected option - tried to use .remove() but my code became buggy
                const previousPTag = document.querySelectorAll('.previous-p');
                const previousHeading = document.querySelectorAll('.heading');
                if(previousPTag.length > 1) {
                    previousPTag[0].replaceWith(previousPTag[1]);
                    previousHeading[0].replaceWith(previousHeading[1]);
                } 
                console.log(previousPTag);
                strongTitle = movie.title;
            }
        }
    })
}

//Now I am going to make a function for the movie review that is outside of the other fxns because I don't want to confuse this eventListener with the other one; to successful do this I am creating a GLOBAL VARIABLE called strongTitle
reviewButton.addEventListener("click", event => {
//since this eventListener corresponds to a form, we have to write the fxn preventDefault to prevent the forms default behavior which is refreshing the page
    event.preventDefault();
    
    //condition for an empty option>>> if no movie was selected        
    if(strongTitle === '') {
        alert('Please select a movie first');
    return;
    }

    const review = reviewInput.value;

    //Then I need to clear the review input as per assignment instructions
    reviewInput.value = ''; //note it is reviewInput.value and NOT review; review is a const therefore it can't be changed additionally I am going to use this variable to display the review comment; it is not the same although the content inside is atm

    let reviewComment = document.createElement('li'); 

    const strongTag = document.createElement('strong');

    strongTag.textContent = strongTitle;

    reviewComment.append(strongTag);

    //Looking back at my notes from the Weather Project I will add like this:
    reviewComment.innerHTML += `: ${review}`;
    //StackFlow also showed this alternative method: reviewComment.append(document.createTextNode(": " + review)); I will eventually learn about .createTextNode()

    reviewSection[0].append(reviewComment);//this code wasn't working when I did reviewSection by itself; apparently this is because I called the div for this item using the document.getElementByClassName() which returns an array-like object similarly to .querySelector >>> good to know!

    //I THINK because there is a event.preventDefault(), which prevents the page from reloading, this fxn (reviewButton.addEventListener()) will continue to populate entered reviews onto the page; therefore no other code is necessary. 

    resetReviewButton.addEventListener('click', event => {
        event.preventDefault();
        reviewSection[0].innerHTML = '';//remember this reviewSection was retrieved useing getElementByClassName which acts like .querySelectorAll (hence an array) we have to use indices even when there is one item; idk why but ill ASKKKKKKK******
    })
})


