





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
    const moviesTitles = document.getElementById('titles');
    const displayInfo = document.getElementById('display-info');
    let film; 
    
    fetch(`https://resource-ghibli-api.onrender.com/films`)
        .then((response) => response.json())
        .then((films) => {
            filmsArray = films;
            console.log(films);
            console.log(films[0]);
            console.log(films[0].title);

            films.forEach((film, i) => {
                const option = document.createElement("option");
                option.innerText = film.title;
                option.setAttribute("value", i);
                document.querySelector("#titles").append(option);
      });
    });

    moviesTitles.addEventListener("change", (event) => {
        event.preventDefault();
        // Clear the display-info field before adding elements
        document.querySelector("#display-info").innerHTML = "";
        // Populate movie details
        const h3 = document.createElement("h3");
        const pMovieRelease = document.createElement("p");
        const pMovieDescription = document.createElement("p");
        film = filmsArray[event.target.value];
        if (film) {
          h3.innerText = film.title;
          pMovieRelease.innerText = film.release_date;
          pMovieDescription.innerText = film.description;
          console.log(event.target.value);
          document
            .querySelector("#display-info")
            .append(h3, pMovieRelease, pMovieDescription);
        }
      });

    const ul = document.querySelector("ul");
    // Add an event listener for submit a review form
    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        const review = document.querySelector("#review").value;
        const li = document.createElement("li");
        if (film) {
            li.innerHTML = `<strong>${film.title}</strong>: ${review}`;
            ul.append(li);
            // clear text input after adding
            document.querySelector("#review").value = "";
        } else {
            window.alert("Please select a movie first");
    }
    });

    const button = document.querySelector("#reset-reviews");
    button.addEventListener("click", (event) => {
        event.preventDefault();
        ul.innerHTML = "";
    });

    const ol = document.querySelector("ol");
    const filmBaseUrl = `https://resource-ghibli-api.onrender.com/films`;
    let peopleArray;
    fetch(`https://resource-ghibli-api.onrender.com/people`)
        .then((response) => response.json())
        .then((people) => {
            peopleArray = people;
    });

// Get People for Movie - add event listener
    const showPeopleButton = document.querySelector("#show-people");
    showPeopleButton.addEventListener("click", (event) => {
        event.preventDefault();
        // console.log(film);
        
  // Reset list

  // Loop through people array and check if people.films.includes(movie id), if so add name to list
    for (let person of peopleArray) {
        console.log("person.films: " + person.films);
        if (person.films.includes(filmBaseUrl + film.id)) {
            const li = document.createElement("li");
            li.innerText = person.name;
            ol.append(li);
            console.log("Name: " + person.name);
            console.log("film id: " + film.id);
        }
     }
});


}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
