// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

// So that testing can work as expected for now
// A non-hacky solution is being researched


const URL = "https://resource-ghibli-api.onrender.com/films/";
const select = document.querySelector("#titles");

function run() {
  // Add code you want to run on page load here
  fetch(URL)
    .then((reset) => reset.json())
    .then((films) => {
      option(films);
      displayPeople(); // Call displayPeople()
    })
    .catch((error) => console.log(error));
}


function option(films) {
	console.log(films);
	for (let film of films) {
	const option = document.createElement("option");
	option.textContent = film.title;
	option.setAttribute("value", film.id);
	select.append(option);
	}
}


function selectChange() {
	select.addEventListener("change", (event) => {
	console.log(event.target.value);
	const filmID = event.target.value;
	const filmByID = `https://resource-ghibli-api.onrender.com/films/${filmID}`;
	fetch(filmByID)
		.then((reset) => reset.json())
		.then((film) => displayMovieDetail(film))
		.catch((error) => console.log(error));
	});
}
	selectChange();


function displayMovieDetail(film) {
	console.log(film);
	const movieTitle = document.querySelector(".movie-title");
	const displayInfo = document.querySelector("#display-info");
	displayInfo.innerHTML = "";
	const p1 = document.createElement("p");
	const p2 = document.createElement("p");
	const p3 = document.createElement("p");
	p1.textContent = film.title;
	p1.classList.add("movie-title");
	p2.textContent = film.release_date;
	p3.textContent = film.description;

	movieTitle.textContent = film.title;
	displayInfo.append(p1, p2, p3); // append p3 to displayInfo
}
	

function reviewSubmit() {
	const reviewForm = document.querySelector("#review-form");
	reviewForm.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!select.value) { // alert
			alert("Please select a movie first");
			return;
		}
		// if selected, get user input
		console.log(event.target.review.value);
		const review = event.target.review.value;
		event.target.review.value = "";
		// then show review
		const reviewList = document.querySelector(".reviews-list");
		const li = document.createElement("li");
		const strong = document.createElement("strong");
		strong.textContent = document.querySelector(".movie-title").innerText + ":";
		li.innerText = " " + review;
		li.prepend(strong);
		reviewList.append(li);
	});
}
reviewSubmit();



function displayPeople() {
  const peopleUrl = "https://resource-ghibli-api.onrender.com/people";
  const peopleButton = document.querySelector("#show-people");
  peopleButton.addEventListener("click", () => {
    
    const peopleList = document.querySelector("#peopleList");
    peopleList.innerHTML = "";

    // Get all people, filter people
    fetch(peopleUrl)
      .then((res) => res.json())
      .then((allPeople) => {
        console.log("allPeople", allPeople);
        const filmID = select.value;
        console.log(filmID);
        const filteredPeople = allPeople.filter((person) =>
          person.films.some((film) => film.split("/").slice(-2, -1)[0] == filmID)
        );
        console.log(filteredPeople);
        
        for (let person of filteredPeople) {
          const li = document.createElement("li");
          li.textContent = person.name;
          peopleList.append(li);
        }
      });
  });
}
displayPeople();




function resetReviews() {
  const deleteButton = document.querySelector("#reset-reviews");
  deleteButton.addEventListener("click", () => {
    const reviewsList = document.querySelector(".reviews-list");
    reviewsList.innerHTML = "";
  });
}
resetReviews();


setTimeout(run, 1000);






