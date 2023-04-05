console.log("It works")

const submitButton = document.getElementById("submit-button")
const titleSelector = document.getElementById("titles")
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 fetch("https://resource-ghibli-api.onrender.com/films")
 .then(response => response.json())
 .then(response => {
    console.log(response)
    populateFormDrop(response)
 })
 .catch(err => {

 })

 let episodeList = []
 let currentEpisode = null

 let populateFormDrop = titles => {
    let counter = 0
    for (const title of titles){
        counter += 1
        if (counter <= 22){
            episodeList.push(title)
            
            let newOption = document.createElement("option")
            newOption.textContent = title.title
            newOption.value = title.title
            titleSelector.append(newOption)
        }
    }
}
submitButton.addEventListener("click", event => {
    event.preventDefault()

    
    titleSelector.innerHTML = ""
    
    let episodeName = titleSelector.value
    let episode = findEpisodeByName(episodeName)
    currentEpisode = episode

    let titleHeader = document.createElement("h3")
    titleHeader.textContent = title.name
    detailContainer.append(titleHeader)

    let description = document.createElement("p")
    description.textContent = episode.description
    detailContainer.append(description)
})
}
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
