// https://resource-ghibli-api.onrender.com/films
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

// function run() {
 // Add code you want to run on page load here
//  fetch

const URL = "https://resource-ghibli-api.onrender.com"
function run() {

const dropdown = document.querySelector(".dropdown");
    fetch (`${URL}/films`).
    then(response => response.json()).
    then(data => {
        for (let i = 0; i <data.length; i++) {

const anOption = document.createElement("option");
    anOption.innerText = data[i].title;
    anOption.value = i;
    dropdown.append(anOption);
    }  
    dropdown.addEventListener("change", (event) => {
    const displayInfo = document.getElementById("display-info");
    displayInfo.innerHTML = "";

const h3ElementTitle = document.createElement("h3");
const pElementYear = document.createElement("p");
const pElementDescription = document.createElement("p");
    h3ElementTitle.innerText = data[dropdown.value].title;
    pElementYear.innerText = data[dropdown.value].release_date;
    pElementDescription.innerText = data[dropdown.value].description;
    displayInfo.append(h3ElementTitle, pElementYear, pElementDescription);
});

document.getElementById("show-people").addEventListener("click", (event) => {
    const movieIndex = document.querySelector(".dropdown").value;
    const peopleArray = data[movieIndex].people;
    console.log(peopleArray);
    const orderedList = document.querySelector("ol");
    orderedList.innerHTML = "";
    peopleArray.forEach((person) => {
                
const listItem = document.createElement("li");
    fetch(`https://resource-ghibli-api.onrender.com${person}`).
    then(personResponse => personResponse.json()).
    then(personObject => {
    listItem.innerText = personObject.name;
    orderedList.append(listItem);

        });
    });

});
    
});
 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched


setTimeout(run, 1000);
