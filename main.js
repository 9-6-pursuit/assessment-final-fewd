
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
let dropdown = document.querySelector('select');

fetch(`https://resource-ghibli-api.onrender.com/films/`).then(response => response.json()).then (movies => {
 for(let i=0; i < movies.length; i++) {
    let option = document.createElement('option');
    option.textContent = movies[i].title;
    dropdown.append(option);
    option.setAttribute('value', movies[i].id);
    
 }// for loop
// data.forEach(movies => {
//     let option = document.createElement('option');
//         option.textContent = movies.title;
//         dropdown.append(option);
//         option.setAttribute('value', movies.id);
// })
})//end of fetch



}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
