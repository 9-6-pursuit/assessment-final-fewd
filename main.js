/** @format */

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
	let select = document.getElementById("titles");
	fetch("https://resource-ghibli-api.onrender.com/films?limit=250")
		.then((res) => res.json())
		.then((res) => {
			res.forEach((element) => {
				let newMovie = document.createElement("option");
				newMovie.value = element.id;
				newMovie.textContent = element.title;
				select.appendChild(newMovie);
			});
		});
	select.addEventListener("change", (e) => {
		let info = document.getElementById("display-info");
		if (select.options[select.selectedIndex].value != "") {
			fetch(
				"https://resource-ghibli-api.onrender.com/films/" +
					select.options[select.selectedIndex].value
			)
				.then((res) => res.json())
				.then((res) => {
					let html =
						"<h3>" +
						select.options[select.selectedIndex].textContent +
						"</h3>" +
						"<p>" +
						res.release_date +
						"</p>" +
						"<p>" +
						res.description +
						"</p>";
                    let people=""
                    if (res.people[0]!="/people/" ){
                        res.people.forEach((person)=>{
                            
                        })
                    }
					info.innerHTML = html;
				});
		} else {
			info.innerHTML = "";
		}
	});
	let form = document.querySelector("form");
	let review = document.getElementById("review");
	let ulrev = document.querySelector("#reviews ul");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		let newReview =
			"<li><strong>" +
			select.options[select.selectedIndex].textContent +
			": </strong>" +
			review.value +
			"</li>";
		review.value = "";
		ulrev.innerHTML += newReview;
	});
	let resetReviews = document.getElementById("reset-reviews");
	resetReviews.addEventListener("click", () => {
		ulrev.innerHTML = "";
	});
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
