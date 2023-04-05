let info = document.querySelector(".display-info");
let reviews = document.querySelector(".reviews");
let submit = document.querySelector("form");
let input = document.querySelector("input");
let select = document.getElementById("titles");
let displayInfo = document.getElementById("display-info");
let resetReview = document.getElementById("reset-reviews");
let showPeople = document.getElementById("show-people");
let people = document.getElementById("people-list");

fetch('https://resource-ghibli-api.onrender.com/films/')
	.then(response => response.json())
	.then(response => run(response))
	.catch(err => window.alert(err));


// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
let moviesData = null;
function run(movies) {
 // Add code you want to run on page load here\
    movies.forEach(movie => {
        let option = document.createElement("option");
        option.value = movie.id;
        option.textContent = movie.title;
        select.append(option);
    });

    moviesData = JSON.parse(JSON.stringify(movies));
    let selectedTitle = "";
    let currentMovie = null;
    select.addEventListener("change", (event) => {
        selectedTitle = select.options[select.selectedIndex].text;
        people.innerHTML = "";
        if (select.value) {
            // event.preventDefault();

            moviesData.forEach(movie => {
                if (movie.title === select.options[select.selectedIndex].text) {
                    currentMovie = movie;
                    showMovieInfo(movie);
                }
            });

            // fetch('https://resource-ghibli-api.onrender.com/films/' + select.value)
            //     .then(response => response.json())
            //     .then(movie => {
            //         currentMovie = movie;
            //         showMovieInfo(movie);
            //     })
            //     .catch(err => window.alert(err));
        }
        else displayInfo.innerHTML = "";
    });

    let reviewsList = document.getElementById("reviews-list");
    submit.addEventListener("submit", event => {
        event.preventDefault();

        if (!select.value) {
            window.alert("Please select a movie first");
        }
        else if (input.value) {
            let text = input.value;
            input.value = "";

            let review = document.createElement("li");
            review.innerHTML = `<strong>${selectedTitle}:</strong> ${text}`;
            reviewsList.append(review);
        }
    });

    resetReview.addEventListener("click", () => reviewsList.innerHTML = "");

    showPeople.addEventListener("click", () => {
        if (select.value) {
            currentMovie.people.forEach(person => {
                fetch('https://resource-ghibli-api.onrender.com' + person)
                    .then(response => response.json())
                    .then(personData => showPerson(personData))
                    .catch(err => window.alert(err));
            });
        }
        else window.alert("Please select a movie first");
    });
}

let showMovieInfo = (movie) => {
    displayInfo.innerHTML = "";
    let title = document.createElement("h3");
    let year = document.createElement("p");
    let desc = document.createElement("p");
    title.innerText = movie.title;
    year.innerText = movie.release_date;
    desc.innerText = movie.description;
    displayInfo.append(title, year, desc);
}

let showPerson = (person) => {
    let personName = document.createElement("li");
    personName.textContent = person.name;
    people.append(personName);
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
