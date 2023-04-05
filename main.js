
fetch('https://resource-ghibli-api.onrender.com/films/')
	.then(response => response.json())
	.then(response => run(response))
	.catch(err => console.error(err));


// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run(movies) {
 // Add code you want to run on page load here\
    let select = document.getElementById("titles");
    movies.forEach(movie => {
        let option = document.createElement("option");
        option.value = movie.id;
        option.textContent = movie.title;
        select.append(option);
    });
}

let selected = document.getElementById("titles").value;
fetch('https://resource-ghibli-api.onrender.com/films/' + selected)
	.then(response => response.json())
	.then(response => showMovieInfo(response))
	.catch(err => console.error(err));

function showMovieInfo(movie) {
    
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
