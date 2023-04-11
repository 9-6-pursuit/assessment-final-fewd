const getMovies = (titles) => {
    titles=document.getElementsByName
}


// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
fetch("https://codetogo.io/api/users.xml")
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    console.log(xml);
  })
  .catch(console.error);


 



// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000)